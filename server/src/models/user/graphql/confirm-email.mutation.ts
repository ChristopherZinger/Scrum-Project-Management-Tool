import { UserProfileDM } from "../../userProfile/datamappers/UserProfileResponse.dm";
import { UserRepository } from "./../model/User.repository";
import { injectable } from "inversify";
import { UserProfileResponse } from "../../userProfile/graphql/userProfileResponse.type";
import { Resolver, Mutation, Arg, Authorized, Ctx } from "type-graphql";
import { redis } from "../../../core/setup-redis-and-express-session";
import { ContextType } from "../../../core/context/context-type";
import { Permission } from "../../../core/authorization/permissions";
import { updateUserContext } from "../../../core/context/update-user-context";
import { emailConfirmationTokenPrefix } from "../../../core/auto-email/create-token-url";
import { UserProfile } from "../../userProfile/model/UserProfile.model";
import customApolloErrors from "../../../core/formatErrors/custom-apollo-errors";

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
			throw customApolloErrors.invalidToken();
		}

		// check session user and token user
		if (context.session.user?.id !== parseInt(userId, 10)) {
			throw customApolloErrors.sessionError("", "Session is missing the user.");
		}

		// db user
		const user = await this.userRepository.findById(parseInt(userId, 10), {
			include: [{ model: UserProfile }]
		});

		if (!user) {
			throw customApolloErrors.userMissingForId();
		}

		if (user.emailConfirmed) {
			throw customApolloErrors.operationFobridden(
				"",
				"User already confirmed the email"
			);
		}

		if (!user.profile) {
			throw customApolloErrors.couldNotLoadUserData();
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
