import { Resolver, Mutation, Arg, Authorized, Ctx } from "type-graphql";
import { redis } from "../../../core/setup-redis-and-express-session";
import { User } from "../model/User.model";
import { getRepository } from "typeorm";
import { UserResponse } from "./register.mutation";
import { ContextType } from "../../../core/context/context-type";
import { Permission } from "../../../core/authorization/permissions";
import { updateUserContext } from "../../../core/context/update-user-context";
/*
 User confirm his email buy clicking on generated link
*/

@Resolver()
export class ConfirmUserEmailResolver {
	@Authorized([Permission.UPDATE_OWN_ACCOUNT])
	@Mutation(() => UserResponse, { nullable: true })
	async confirmUserEmail(
		@Arg("token") token: string,
		@Ctx() context: ContextType
	): Promise<UserResponse | null> {
		const userRepository = getRepository(User);

		// token user
		const userId = await redis.get(token);
		if (!userId) {
			console.error("Incorrect token. Could not get user id from redis");
			return null;
		}

		// check session user and token user
		if (context.session.user?.id !== parseInt(userId, 10)) {
			console.error(
				`session user with id ${context.session.user?.id} can not confirm email for user with redis token id ${userId} `
			);
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

		if (user.emailConfirmed) {
			console.log("User already confirmed the email", user.emailConfirmed);
			return null;
		}

		// update model
		user.emailConfirmed = new Date();
		user.isActive = true;
		const updatedUser = await userRepository.save(user);

		await redis.del(token);

		// update context
		updateUserContext(context, {
			isActive: true,
			emailConfirmed: user.emailConfirmed
		});

		const returnUser: UserResponse = {
			email: updatedUser.email
		};

		return returnUser;
	}
}
