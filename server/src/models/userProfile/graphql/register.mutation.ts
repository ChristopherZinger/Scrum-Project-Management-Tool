import { createConfirmationUrl } from "./../../../core/auto-email/create-token-url";
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
		private userProfileRegisterService: UserProfileService, //private userRepository: UserRepository
		private userProfileDM: UserProfileDM
	) {}

	@Mutation(() => UserProfileResponse, { nullable: true })
	async register(
		@Arg("data") data: RegisterUserProfileInputType,
		@Ctx() context: ContextType
	): Promise<UserProfileResponse | null> {
		data.email = data.email.toLowerCase();

		try {
			const newUser = await this.userProfileRegisterService.register(
				data,
				context
			);

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
			const confirmationUrl = await createConfirmationUrl(newUser.id);
			const confirmationEmail = createConfirmationEmail(
				newUser.email,
				confirmationUrl
			);
			sendEmail(confirmationEmail);

			// context
			createUserContext(context, {
				id: newUser.id,
				email: newUser.email,
				role: newUser.role,
				emailConfirmed: newUser.emailConfirmed,
				isActive: newUser.isActive,
				removedAt: newUser.removedAt
			});

			return this.userProfileDM.createUserProfileResponse(
				newUser,
				newUser.profile
			);
		} catch (err) {
			console.error(err);
		}
		return null;
	}
}
