import { UserProfileInvitationService } from "./../services/user-profile-invitation.service";
import { UserSessionDM } from "./../../user/datamappers/UserSession.dm";
import { UserProfileDM } from "./../datamappers/UserProfileResponse.dm";
import customApolloErrors from "../../../core/formatErrors/custom-apollo-errors";
import { UserProfileService } from "./../services/user-profile-register.service";
import { ContextType } from "./../../../core/context/context-type";
import { UserProfileResponse } from "./userProfileResponse.type";
import {
	Resolver,
	Mutation,
	Arg,
	Ctx,
	InputType,
	Field,
	Int
} from "type-graphql";
import { injectable } from "inversify";
import { Length } from "class-validator";
import { createUserContext } from "./../../../core/context/create-user-context";
import { createConfirmationEmail } from "../../../core/auto-email/email-templates/confirmation-email";
import { sendEmail } from "../../../core/auto-email/email-service";

@InputType()
class RegisterWithInvitationInputType {
	@Field(() => Int)
	public companyId!: number;

	@Field(() => String)
	public firstname!: string;

	@Field(() => String)
	public lastname!: string;

	@Field(() => String)
	@Length(8, 255, {
		message: "Incorrect password length. Has to be between 8 and 255 charactes."
	})
	public password!: string;

	@Field(() => String)
	public token!: string;
}

@injectable()
@Resolver()
export class RegisterWithInvitationMutation {
	public constructor(
		private userProfileService: UserProfileService,
		private userProfileDM: UserProfileDM,
		private userSessionDM: UserSessionDM,
		private userProfileInvitationService: UserProfileInvitationService
	) {}

	@Mutation(() => UserProfileResponse)
	public async registerWithInvitation(
		@Arg("data") data: RegisterWithInvitationInputType,
		@Ctx() context: ContextType
	): Promise<UserProfileResponse> {
		// get email from redis
		const { email } = await this.userProfileInvitationService.getInvitation(
			data.token,
			data.companyId
		);

		if (!email) {
			throw customApolloErrors.invalidToken();
		}

		const newUser = await this.userProfileService.register(
			{
				...data,
				email
			},
			undefined,
			data.companyId
		);

		if (!newUser) {
			throw customApolloErrors.somethingWentWrong(
				"",
				"New user wasn't created."
			);
		}

		if (!newUser.profile || !newUser.profile.company) {
			throw customApolloErrors.couldNotLoadUserData();
		}

		// remove from redis pending invitations
		await this.userProfileInvitationService.removeInvitation(
			data.companyId,
			data.token
		);

		// context
		createUserContext(
			context,
			this.userSessionDM.createUserSessionType(
				newUser,
				newUser.profile,
				newUser.profile.company?.id || null
			)
		);

		// send email
		const confirmationEmail = await createConfirmationEmail(
			newUser.email,
			newUser.id
		);
		await sendEmail(confirmationEmail);

		return this.userProfileDM.createUserProfileResponse(
			newUser,
			newUser.profile
		);
	}
}
