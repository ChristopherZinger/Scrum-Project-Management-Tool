import { Resolver, Mutation, Arg, Field, InputType, Ctx } from "type-graphql";
import { Length } from "class-validator";
import { redis } from "../../../core/setup-redis-and-express-session";
import { User } from "../model/User.model";
import { getRepository } from "typeorm";
import { UserResponse } from "./register.mutation";
import { ContextType } from "../../../core/context/context-type";
import { createUserContext } from "../../../core/context/create-user-context";
import { passwordChangeTokenPrefix } from "../../../core/auto-email/create-token-url";
import bcrypt from "bcryptjs";

@InputType()
class ChangePassword {
	@Field(() => String)
	@Length(8, 255, {
		message: "Incorrect password length. Has to be between 8 and 255 charactes."
	})
	password!: string;

	@Field()
	token!: string;
}

@Resolver()
export class ChangePasswordMutation {
	@Mutation(() => UserResponse, { nullable: true })
	async changePassword(
		@Arg("data") data: ChangePassword,
		@Ctx() context: ContextType
	): Promise<UserResponse | null> {
		const userRepository = getRepository(User);

		// token user
		const userId = await redis.get(passwordChangeTokenPrefix + data.token);
		if (!userId) {
			console.error("Incorrect token. Could not get user id from redis");
			return null;
		}

		// db user
		const user = await userRepository.findOne({
			where: { id: parseInt(userId, 10) }
		});

		if (!user) {
			console.log("Can't find user with id: ", userId);
			return null;
		}

		// update model
		user.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(12));
		const updatedUser = await userRepository.save(user);

		await redis.del(passwordChangeTokenPrefix + data.token);

		// update context - login user
		createUserContext(context, {
			id: updatedUser.id,
			email: updatedUser.email,
			isActive: updatedUser.isActive,
			emailConfirmed: updatedUser.emailConfirmed,
			role: updatedUser.role
		});

		const returnUser: UserResponse = {
			email: updatedUser.email
		};

		return returnUser;
	}
}
