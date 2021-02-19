import { ApolloError } from "apollo-server-express";
import { UserRepository } from "./../../user/model/User.repository";
import { injectable } from "inversify";
import { Resolver, Query, Ctx } from "type-graphql";
import { UserProfileResponse } from "./userProfileResponse.type";
import { ContextType } from "../../../core/context/context-type";
import { UserProfileDM } from "../datamappers/UserProfileResponse.dm";
import { UserProfile } from "../model/UserProfile.model";

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
			console.error(
				`Wrong credentials: email. for '${context.session.user.email}'`
			);
			throw new ApolloError("incorrect email", "WRONG_CREDENTIALS");
		}

		if (!user.profile) {
			console.error(
				`Could not load a userProfile for user witch email : ${context.session.user.email}`
			);
			throw new ApolloError(
				"Part of the data is missing",
				"USER_PROFILE_IS_MISSING"
			);
		}

		return await this.userProfileDM.createUserProfileResponse(
			user,
			user.profile
		);
	}
}
