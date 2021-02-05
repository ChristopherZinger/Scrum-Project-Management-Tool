import { Resolver, Mutation, Ctx, Arg, Field, InputType } from "type-graphql";
import { IsEmail, Length } from "class-validator";
import { getRepository } from "typeorm";
import { UserResponse } from "./user-response.type";
import { ContextType } from "../../../core/context/context-type";
import bcrypt from "bcryptjs";
import { User } from "../model/User.model";
import { createUserContext } from "../../../core/context/create-user-context";

@InputType()
class LoginInputType {
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
export class LoginMutation {
	@Mutation(() => UserResponse, { nullable: true })
	async login(
		@Arg("data") data: LoginInputType,
		@Ctx() context: ContextType
	): Promise<UserResponse | null> {
		const userRepository = getRepository(User);
		const lowerCaseEmail = data.email.toLowerCase();
		const user = await userRepository.findOne({
			where: { email: lowerCaseEmail }
		});

		if (!user) {
			console.warn("Wrong credentials: email.");
			return null;
		}

		const valid = bcrypt.compareSync(data.password, user.password);

		if (!valid) {
			console.warn("Wrong credentials: password.");
			return null;
		}

		createUserContext(context, {
			id: user.id,
			email: user.email,
			role: user.role,
			emailConfirmed: user.emailConfirmed,
			isActive: user.isActive,
			removedAt: user.removedAt
		});

		console.log(`User: ${user.email} has logged in.`);

		return {
			email: user.email,
			isActive: user.isActive,
			emailConfirmed: user.emailConfirmed
		};
	}
}
