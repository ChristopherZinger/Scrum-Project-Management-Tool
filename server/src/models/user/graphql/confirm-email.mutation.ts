import { UserProfileDM } from "../../userProfile/datamappers/UserProfileResponse.dm";
import { UserRepository } from "./../model/User.repository";
import { injectable } from "inversify";
import { ApolloError } from "apollo-server-express";
import { UserProfileResponse } from "../../userProfile/graphql/userProfileResponse.type";
import { Resolver, Mutation, Arg, Authorized, Ctx } from "type-graphql";
import { redis } from "../../../core/setup-redis-and-express-session";
import { ContextType } from "../../../core/context/context-type";
import { Permission } from "../../../core/authorization/permissions";
import { updateUserContext } from "../../../core/context/update-user-context";
import { emailConfirmationTokenPrefix } from "../../../core/auto-email/create-token-url";
import { UserProfile } from "@/models/userProfile/model/UserProfile.model";

@injectable()
@Resolver()
export class ConfirmUserEmailResolver {
	public constructor(
		private userRepository: UserRepository,
		private userProfileDM: UserProfileDM
	) {}

	@Authorized([Permission.UPDATE_OWN_ACCOUNT])
	@Mutation(() => UserProfileResponse, { nullable: true })
	async confirmUserEmail(
		@Arg("token") token: string,
		@Ctx() context: ContextType
	): Promise<UserProfileResponse> {
		// token user
		const userId = await redis.get(emailConfirmationTokenPrefix + token);
		if (!userId) {
			console.error("Incorrect token. Could not get user id from redis");
			throw new ApolloError("Incorrect token.", "INCORRECT_TOKEN");
		}

		// check session user and token user
		if (context.session.user?.id !== parseInt(userId, 10)) {
			console.error(
				`session user with id ${context.session.user?.id} can not confirm email for user with redis token id ${userId} `
			);
			throw new ApolloError("Session is missing the user.", "SESSION_ERROR");
		}

		// db user
		const user = await this.userRepository.findById(parseInt(userId, 10), {
			include: [{ model: UserProfile }]
		});

		if (!user) {
			console.error("Can't find user with id: ", userId);
			throw new ApolloError(
				"Can't find user with requested id",
				"USER_MISSING"
			);
		}

		if (user.emailConfirmed) {
			console.log("User already confirmed the email", user.emailConfirmed);
			throw new ApolloError("Email is already confirmed", "EMAIL_CONFIRMED");
		}

		if (!user.profile) {
			console.error("Can't find profile for user with id: ", userId);
			throw new ApolloError(
				"Can't find profile for this user",
				"USER_PROFILE_MISSING"
			);
		}

		// update model
		user.emailConfirmed = new Date();
		user.isActive = true;
		const updatedUser = await this.userRepository.save(user);
		await redis.del(emailConfirmationTokenPrefix + token);

		// update context
		updateUserContext(context, {
			isActive: true,
			emailConfirmed: user.emailConfirmed
		});

		return this.userProfileDM.createUserProfileResponse(
			updatedUser,
			user.profile
		);
	}
}
