import { UserProfileDM } from "../../userProfile/datamappers/UserProfileResponse.dm";
import { ApolloError } from "apollo-server-express";
import { UserRepository } from "./../model/User.repository";
import { injectable } from "inversify";
import { UserProfileResponse } from "../../userProfile/graphql/userProfileResponse.type";
import { Resolver, Mutation, Arg, Field, InputType, Ctx } from "type-graphql";
import { Length } from "class-validator";
import { redis } from "../../../core/setup-redis-and-express-session";
import { ContextType } from "../../../core/context/context-type";
import { createUserContext } from "../../../core/context/create-user-context";
import { passwordChangeTokenPrefix } from "../../../core/auto-email/create-token-url";
import bcrypt from "bcryptjs";
import { UserProfile } from "../../userProfile/model/UserProfile.model";

@InputType()
class ChangePassword {
	@Field(() => String)
	@Length(8, 255, {
		message: "Incorrect password length. Has to be between 8 and 255 charactes."
	})
	password!: string;

	@Field()
	token!: string;
}

@injectable()
@Resolver()
export class ChangePasswordMutation {
	constructor(
		private userRepository: UserRepository,
		private userProfileDM: UserProfileDM
	) {}
	@Mutation(() => UserProfileResponse, { nullable: true })
	async changePassword(
		@Arg("data") data: ChangePassword,
		@Ctx() context: ContextType
	): Promise<UserProfileResponse | null> {
		// token user
		const userId = await redis.get(passwordChangeTokenPrefix + data.token);
		if (!userId) {
			console.error("Incorrect token. Could not get user id from redis");
			throw new ApolloError("Incorrect token.", "INCORRECT_TOKEN");
		}

		// db user
		const user = await this.userRepository.findById(parseInt(userId, 10), {
			include: [{ model: UserProfile }]
		});

		if (!user) {
			console.error(`Can't find user with id: '${userId}'`);
			throw new ApolloError(
				"Can't find user with this ID.",
				"USER_DOES_NOT_EXIST"
			);
		}

		if (!user.profile) {
			console.error(`Can't find profile for user with id: '${userId}'`);
			throw new ApolloError(
				"Can't find profile for user with this ID.",
				"COULD_NOT_LOAD_USER_DATA"
			);
		}

		// update model
		user.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(12));
		const updatedUser = await this.userRepository.save(user);
		await redis.del(passwordChangeTokenPrefix + data.token);

		// update context - login user
		createUserContext(context, {
			id: updatedUser.id,
			email: updatedUser.email,
			isActive: updatedUser.isActive,
			emailConfirmed: updatedUser.emailConfirmed,
			role: updatedUser.role
		});

		return this.userProfileDM.createUserProfileResponse(user, user.profile);
	}
}
