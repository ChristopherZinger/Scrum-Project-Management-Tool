import { ContextType } from "@/core/create-gql-context";
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
		user.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(15));
		user.role = UserRole.BASE_USER;
		const newUser = await userRepository.save(user);

		return { email: newUser.email };
	}
}
