import { UserProfileInvitationService } from "./../services/user-profile-invitation.service";
import { UserRepository } from "../../user/model/User.repository";
import { ContextType } from "../../../core/context/context-type";
import { Resolver, Mutation, Ctx, Arg, Authorized } from "type-graphql";
import { injectable } from "inversify";
import { ApolloError } from "apollo-server-errors";

@injectable()
@Resolver()
export class InviteTeammateMutation {
	public constructor(
		private userRepository: UserRepository,
		private userProfileInvitationServices: UserProfileInvitationService
	) {}

	@Authorized()
	@Mutation(() => Boolean)
	public async inviteTeammate(
		@Arg("email") email: string,
		@Ctx() context: ContextType
	): Promise<boolean> {
		const emailLowerCase = email.toLowerCase();

		// check if invited user with email already exists in db
		const invitedUser = await this.userRepository.findByEmail(emailLowerCase);
		if (invitedUser) {
			throw new ApolloError(
				"User already exists in data base. At the moment you can only invite users that do not exist in database",
				"USER_IS_REGISTERED"
			);
		}

		// TODO: check if user with this email is assigned to other company

		// push user to companys pending invitation in redis and send email
		try {
			await this.userProfileInvitationServices.addInvitation(context, email);
		} catch (err) {
			console.error(err);
		}

		return true;
	}
}
