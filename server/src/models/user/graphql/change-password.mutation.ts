import { UserSessionDM } from "./../datamappers/UserSession.dm";
import { UserProfileDM } from "../../userProfile/datamappers/UserProfileResponse.dm";
import { UserRepository } from "./../model/User.repository";
import { injectable } from "inversify";
import { UserProfileResponse } from "../../userProfile/graphql/userProfileResponse.type";
import { Resolver, Mutation, Arg, Field, InputType, Ctx } from "type-graphql";
import { Length } from "class-validator";
import { redis } from "../../../core/setup-redis-and-express-session";
import { ContextType } from "../../../core/context/context-type";
import { createUserContext } from "../../../core/context/create-user-context";
import bcrypt from "bcryptjs";
import { UserProfile } from "../../userProfile/model/UserProfile.model";
import customApolloErrors from "../../../core/formatErrors/custom-apollo-errors";
import { Company } from "../../company/model/Company.model";
import { CONST } from "../../../core/CONST";

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
		private userProfileDM: UserProfileDM,
		private userSessionDM: UserSessionDM
	) {}
	@Mutation(() => UserProfileResponse, { nullable: true })
	async changePassword(
		@Arg("data") data: ChangePassword,
		@Ctx() context: ContextType
	): Promise<UserProfileResponse | null> {
		// token user
		const userId = await redis.get(
			CONST.redisPrefix.passwordChangeTokenPrefix + data.token
		);
		if (!userId) {
			console.error("Incorrect token. Could not get user id from redis");
			throw customApolloErrors.invalidToken();
		}

		// db user
		const user = await this.userRepository.findById(parseInt(userId, 10), {
			include: [{ model: UserProfile, include: [{ model: Company }] }]
		});

		if (!user) {
			throw customApolloErrors.userMissingForId();
		}

		if (!user.profile || !user.profile.company) {
			throw customApolloErrors.couldNotLoadUserData();
		}

		// update model
		user.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(12));
		const updatedUser = await this.userRepository.save(user);
		await redis.del(CONST.redisPrefix.passwordChangeTokenPrefix + data.token);

		// update context - login user
		createUserContext(
			context,
			this.userSessionDM.createUserSessionType(
				updatedUser,
				user.profile,
				user.profile.company.id
			)
		);

		return this.userProfileDM.createUserProfileResponse(user, user.profile);
	}
}
