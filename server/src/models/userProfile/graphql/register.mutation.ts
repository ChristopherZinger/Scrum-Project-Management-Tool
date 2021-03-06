import { UserSessionDM } from "./../../user/datamappers/UserSession.dm";
import { createConfirmationEmail } from "../../../core/auto-email/email-templates/confirmation-email";
import { ContextType } from "./../../../core/context/context-type";
import { UserProfileResponse } from "./userProfileResponse.type";
import { Resolver, Mutation, Ctx, Arg, Field, InputType } from "type-graphql";
import { IsEmail, Length } from "class-validator";
import { UserProfileService } from "../services/user-profile-register.service";
import { injectable } from "inversify";
import { sendEmail } from "../../../core/auto-email/email-service";
import { createUserContext } from "./../../../core/context/create-user-context";
import { UserProfileDM } from "../datamappers/UserProfileResponse.dm";
import customApolloErrors from "../../../core/formatErrors/custom-apollo-errors";

@InputType()
export class RegisterUserProfileInputType {
	@Field(() => String)
	@Length(8, 255, {
		message: "Incorrect password length. Has to be between 8 and 255 charactes."
	})
	password!: string;

	@Field(() => String)
	@IsEmail()
	email!: string;

	@Field(() => String)
	firstname!: string;

	@Field(() => String)
	lastname!: string;
}

@injectable()
@Resolver()
export class RegisterMutation {
	public constructor(
		private userProfileRegisterService: UserProfileService,
		private userProfileDM: UserProfileDM,
		private userSessionDM: UserSessionDM
	) {}

	@Mutation(() => UserProfileResponse)
	async register(
		@Arg("data") data: RegisterUserProfileInputType,
		@Ctx() context: ContextType
	): Promise<UserProfileResponse> {
		data.email = data.email.toLowerCase();

		const newUser = await this.userProfileRegisterService.register(data);

		if (!newUser) {
			throw customApolloErrors.somethingWentWrong(
				"",
				"New user wasn't created."
			);
		}

		if (!newUser.profile) {
			throw customApolloErrors.couldNotLoadUserData();
		}

		// send emails
		const confirmationEmail = await createConfirmationEmail(
			newUser.email,
			newUser.id
		);
		await sendEmail(confirmationEmail);

		// context
		createUserContext(
			context,
			this.userSessionDM.createUserSessionType(newUser, newUser.profile, null)
		);

		return this.userProfileDM.createUserProfileResponse(
			newUser,
			newUser.profile
		);
	}
}
