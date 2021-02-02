import { ContextType } from "../../../core/context/context-type";
import { IsEmail, Length } from "class-validator";
import {
	Arg,
	Ctx,
	Field,
	InputType,
	Mutation,
	ObjectType,
	Resolver
} from "type-graphql";
import { User, UserRole } from "../model/User.model";
import bcrypt from "bcryptjs";
import { getRepository } from "typeorm";
import { sendEmail } from "../../../core/auto-email/send-email";
import { createConfirmationUrl } from "../../../core/auto-email/create-token-url";
import { createConfirmationEmail } from "../../../core/auto-email/emails/create-confirmation-email";

/*
	Saves new user to db and sends confirmation email
*/

@ObjectType()
export class UserResponse {
	@Field()
	email!: string;
}

@InputType()
class RegistrationInputType {
	@Field(() => String)
	@Length(8, 255, {
		message: "Incorrect password length. Has to be between 8 and 255 charactes."
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
			throw new Error("user with this email already exists");
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

		return { email: newUser.email };
	}
}
