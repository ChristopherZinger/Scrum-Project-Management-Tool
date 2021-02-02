import { Resolver, Mutation, Ctx, Arg, Field, InputType } from "type-graphql";
import { IsEmail, Length } from "class-validator";
import { getRepository } from "typeorm";
import { UserResponse } from "./register.mutation";
import { ContextType } from "../../../core/create-gql-context";
import bcrypt from "bcryptjs";
import { User } from "../model/User.model";

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
		@Ctx() ctx: ContextType
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

		ctx.session.user = {
			id: user.id,
			email: user.email,
			role: user.role,
			emailConfirmed: user.emailConfirmed,
			isActive: user.isActive,
			removedAt: user.removedAt
		};

		return { email: user.email };
	}
}
