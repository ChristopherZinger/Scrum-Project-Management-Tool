import { UserRepository } from "./../../user/model/User.repository";
import { injectable } from "inversify";
import { Resolver, Query, Ctx } from "type-graphql";
import { UserProfileResponse } from "./userProfileResponse.type";
import { ContextType } from "../../../core/context/context-type";
import { UserProfileDM } from "../datamappers/UserProfileResponse.dm";
import { UserProfile } from "../model/UserProfile.model";
import customApolloErrors from "../../../core/formatErrors/custom-apollo-errors";

@injectable()
@Resolver()
export class MyProfileQuery {
	public constructor(
		private userProfileDM: UserProfileDM,
		private userRepository: UserRepository
	) {}

	@Query(() => UserProfileResponse, { nullable: true })
	public async user(
		@Ctx() context: ContextType
	): Promise<UserProfileResponse | null> {
		if (!context.session.user) {
			return null;
		}

		const user = await this.userRepository.findByEmail(
			context.session.user.email,
			{
				include: [{ model: UserProfile }]
			}
		);

		if (!user) {
			throw customApolloErrors.userMissingForEmail();
		}

		if (!user.profile) {
			throw customApolloErrors.couldNotLoadUserData();
		}

		return await this.userProfileDM.createUserProfileResponse(
			user,
			user.profile
		);
	}
}
