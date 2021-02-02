import { Resolver, Mutation, Arg } from "type-graphql";
import { redis } from "../../../core/setup-redis-and-express-session";
import { User } from "../model/User.model";
import { getRepository } from "typeorm";
import { UserResponse } from "./register.mutation";

/*
 User confirm his email buy clicking on generated link
*/

@Resolver()
export class ConfirmUserEmailResolver {
	@Mutation(() => UserResponse, { nullable: true })
	async confirmUserEmail(
		@Arg("token") token: string
	): Promise<UserResponse | null> {
		const userRepository = getRepository(User);
		const userId = await redis.get(token);

		if (!userId) {
			return null;
		}

		const user = await userRepository.findOne({
			where: { id: parseInt(userId, 10) }
		});
		if (!user) {
			return null;
		}
		user.emailConfirmed = new Date();
		const updatedUser = await userRepository.save(user);

		await redis.del(token);

		const returnUser: UserResponse = {
			email: updatedUser.email
		};

		return returnUser;
	}
}
