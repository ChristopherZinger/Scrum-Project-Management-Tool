import { createConfirmationUrl } from "./../../../core/auto-email/create-token-url";
import { createConfirmationEmail } from "./../../../core/auto-email/emails/create-confirmation-email";
import { ContextType } from "./../../../core/context/context-type";
import { UserProfileResponse } from "./userProfileResponse.type";
import { Resolver, Mutation, Ctx, Arg, Field, InputType } from "type-graphql";
import { IsEmail, Length } from "class-validator";
import { UserProfileService } from "../services/user-profile-register.service";
import { injectable } from "inversify";
import { sendEmail } from "./../../../core/auto-email/send-email";
import { createUserContext } from "./../../../core/context/create-user-context";

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
		private userProfileRegisterService: UserProfileService //private userRepository: UserRepository
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
				throw new Error(`Could not find a user with email: ${data.email}`);
			}

			if (!newUser.profile) {
				throw new Error(
					`Could not load a userProfile for user witch email : ${data.email}`
				);
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

			return {
				profileId: newUser.profile.id,
				firstname: newUser.profile.firstname,
				lastname: newUser.profile.lastname,
				email: newUser.email,
				isActive: newUser.isActive,
				emailConfirmed: newUser.emailConfirmed || undefined
			};
		} catch (err) {
			console.error(err);
		}
		return null;
	}
}
