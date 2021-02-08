import { ContextType } from "../../../core/context/context-type";
import { IsEmail, Length } from "class-validator";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { User, UserRole } from "../model/User.model";
import bcrypt from "bcryptjs";
import { getRepository } from "typeorm";
import { sendEmail } from "../../../core/auto-email/send-email";
import { createConfirmationUrl } from "../../../core/auto-email/create-token-url";
import { createConfirmationEmail } from "../../../core/auto-email/emails/create-confirmation-email";
import { UserResponse } from "./user-response.type";
import { ApolloError } from "apollo-server-express";

/*
	Saves new user to db and sends confirmation email
*/

@InputType()
class RegistrationInputType {
	@Field(() => String)
	@Length(8, 255, {
		message: "Password has to be longer then 8 charactes."
	})
	password!: string;

	@Field(() => String)
	@IsEmail()
	email!: string;
}

@Resolver()
export class RegisterMutation {
	@Mutation(() => UserResponse)
	async register(
		@Arg("data") data: RegistrationInputType,
		@Ctx() ctx: ContextType
	): Promise<UserResponse> {
		const userRepository = getRepository(User);
		const userExist = await userRepository.findOne({
			where: { email: data.email }
		});

		if (userExist) {
			throw new ApolloError(
				"user with this email already exists",
				"EMAIL_IS_TAKEN"
			);
		}

		const user = new User();
		user.email = data.email.toLocaleLowerCase();
		user.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(12));
		user.role = UserRole.BASE_USER;
		const newUser = await userRepository.save(user);

		const confirmationUrl = await createConfirmationUrl(newUser.id);
		const confirmationEmail = createConfirmationEmail(
			newUser.email,
			confirmationUrl
		);
		sendEmail(confirmationEmail);

		return {
			email: newUser.email,
			isActive: newUser.isActive,
			emailConfirmed: newUser.emailConfirmed
		};
	}
}
