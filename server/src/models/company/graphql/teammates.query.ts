import { UserProfileInvitationService } from "./../../userProfile/services/user-profile-invitation.service";
import { UserProfileDM } from "./../../userProfile/datamappers/UserProfileResponse.dm";
import { UserProfileRepository } from "./../../userProfile/model/UserProfile.repository";
import { ContextType } from "./../../../core/context/context-type";
import { injectable } from "inversify";
import {
	Resolver,
	Query,
	Ctx,
	Authorized,
	ObjectType,
	Field
} from "type-graphql";
import {
	ITeammateResponse,
	ITeammatesResponse
} from "../../userProfile/type-guards";

@ObjectType()
class TeammatesResponse implements ITeammatesResponse {
	@Field(() => [String])
	public invitedUsers!: string[];

	@Field(() => [TeammateResponse])
	public registeredUsers!: ITeammateResponse[];
}

@ObjectType()
class TeammateResponse implements ITeammateResponse {
	@Field(() => String)
	public firstname!: string;

	@Field(() => String)
	public lastname!: string;

	@Field(() => String)
	public email!: string;
}

@injectable()
@Resolver()
export class TeammatesQuery {
	public constructor(
		private userProfileRepository: UserProfileRepository,
		private userProfileDM: UserProfileDM,
		private userProfileInvitationService: UserProfileInvitationService
	) {}

	@Authorized()
	@Query(() => TeammatesResponse)
	public async teammates(
		@Ctx() context: ContextType
	): Promise<ITeammatesResponse> {
		// find pending invitations in redis
		const pendingInvitationEmails = await this.userProfileInvitationService.getAllInvitations(
			context
		);

		// find teammates in db
		const allUsersOfCompany = await this.userProfileRepository.findTeammates(
			context
		);

		// map data for users in db
		const registeredUsers = allUsersOfCompany
			.filter(profile => !!profile.user)
			.map(profile =>
				this.userProfileDM.createTeammateResponse(profile.user!, profile)
			);

		return {
			invitedUsers: pendingInvitationEmails,
			registeredUsers: registeredUsers
		};
	}
}
