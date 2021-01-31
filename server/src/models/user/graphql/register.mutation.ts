import { ContextType } from "@/core/create-gql-context";
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { User } from "../model/User.model";
import bcrypt from "bcryptjs";
import { getRepository } from "typeorm";
import { UserRepository } from "../model/User.repository";

@ObjectType()
export class UserResponse {
	@Field()
	email: string;
}

@Resolver()
export class RegisterMutation {
	@Mutation(() => UserResponse)
	async register(
		@Arg("email") email: string,
		@Arg("password") password: string,
		@Ctx() ctx: ContextType
	): Promise<UserResponse> {
		const userRepository = getRepository(User);
		const userExist = await userRepository.findOne({ where: { email } });

		if (userExist) {
			throw new Error("user with this email already exists");
		}

		const user = new User();
		user.email = email.toLocaleLowerCase();
		user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(15));
		const newUser = await userRepository.save(user);

		return { email: newUser.email };
	}
}
