import { Resolver, Mutation, Ctx, Arg } from "type-graphql";
import { getRepository } from "typeorm";
import { UserResponse } from "./register.mutation";
import { ContextType } from "../../../core/create-gql-context";
import bcrypt from "bcryptjs";
import { User } from "../model/User.model";

@Resolver()
export class LoginMutation {
	@Mutation(() => UserResponse, { nullable: true })
	async login(
		@Arg("email") email: string,
		@Arg("password") password: string,
		@Ctx() ctx: ContextType
	): Promise<UserResponse | null> {
		const userRepository = getRepository(User);
		const lowerCaseEmail = email.toLowerCase();
		const user = await userRepository.findOne({
			where: { email: lowerCaseEmail }
		});

		if (!user) {
			console.warn("Wrong credentials: email.");
			return null;
		}

		const valid = bcrypt.compareSync(password, user.password);

		if (!valid) {
			console.warn("Wrong credentials: password.");
			return null;
		}

		ctx.request.session.user = {
			id: user.id,
			email: user.email,
			role: user.role
		};

		return { email: user.email };
	}
}
