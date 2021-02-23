import { UserRepository } from "../../user/model/User.repository";
import { ContextType } from "../../../core/context/context-type";
import { Resolver, Mutation, Ctx, Arg, Authorized } from "type-graphql";
import customApolloErrors from "../../../core/formatErrors/custom-apollo-errors";
import { injectable } from "inversify";
import { UserProfile } from "../model/UserProfile.model";
import { Company } from "../../company/model/Company.model";
import { ApolloError } from "apollo-server-errors";
import { EmailService } from "../../../core/auto-email/email-service";
import { createTeammageInvitationEmail } from "../../../core/auto-email/email-templates/teammate-invitation-email";

@injectable()
@Resolver()
export class InviteResolver {
	public constructor(private userRepository: UserRepository) {}

	@Authorized()
	@Mutation(() => Boolean)
	public async inviteTeammate(
		@Arg("email") email: string,
		@Ctx() context: ContextType
	): Promise<boolean> {
		const emailLowerCase = email.toLowerCase();

		// check if session user exists
		if (!context.session.user) {
			throw customApolloErrors.sessionError();
		}

		// get session user company
		const user = await this.userRepository.findById(context.session.user.id, {
			include: [{ model: UserProfile, include: [{ model: Company }] }]
		});

		if (!user) {
			throw customApolloErrors.userMissingForId();
		}

		if (!user.profile?.company) {
			throw customApolloErrors.couldNotLoadUserData();
		}

		// TODO: check if invited user with email already exists
		const invitedUser = await this.userRepository.findByEmail(emailLowerCase);
		if (invitedUser) {
			throw new ApolloError(
				"User already exists in data base. At the moment you can only invite users that do not exist in database",
				"USER_IS_REGISTERED"
			);
		}

		// TODO: check if user with this email is assigned to other company

		// send email to invited user
		const emailService = new EmailService();
		const invitationEmail = await createTeammageInvitationEmail(
			emailLowerCase,
			user.profile.company.name
		);
		emailService.send(invitationEmail);

		return true;
	}
}
