import { Resolver /* Mutation, Arg, Authorized, Ctx */ } from "type-graphql";
// import { redis } from "../../../core/setup-redis-and-express-session";
// import { User } from "../model/User.model";
// import { UserResponse } from "./user-response.type";
// import { ContextType } from "../../../core/context/context-type";
// import { Permission } from "../../../core/authorization/permissions";
// import { updateUserContext } from "../../../core/context/update-user-context";
// import { emailConfirmationTokenPrefix } from "../../../core/auto-email/create-token-url";

/*
 User confirm his email buy clicking on generated link
*/

@Resolver()
export class ConfirmUserEmailResolver {
	// @Authorized([Permission.UPDATE_OWN_ACCOUNT])
	// @Mutation(() => UserResponse, { nullable: true })
	// async confirmUserEmail(
	// 	@Arg("token") token: string,
	// 	@Ctx() context: ContextType
	// ): Promise<UserResponse | null> {
	// 	// token user
	// 	const userId = await redis.get(emailConfirmationTokenPrefix + token);
	// 	if (!userId) {
	// 		console.error("Incorrect token. Could not get user id from redis");
	// 		return null;
	// 	}
	// 	// check session user and token user
	// 	if (context.session.user?.id !== parseInt(userId, 10)) {
	// 		console.error(
	// 			`session user with id ${context.session.user?.id} can not confirm email for user with redis token id ${userId} `
	// 		);
	// 		return null;
	// 	}
	// 	// db user
	// 	const user = await User.findOne({
	// 		where: { id: parseInt(userId, 10) }
	// 	});
	// 	if (!user) {
	// 		console.log("Can't find user with id: ", userId);
	// 		return null;
	// 	}
	// 	if (user.emailConfirmed) {
	// 		console.log("User already confirmed the email", user.emailConfirmed);
	// 		return null;
	// 	}
	// 	// update model
	// 	user.emailConfirmed = new Date();
	// 	user.isActive = true;
	// 	const updatedUser = await user.save();
	// 	await redis.del(emailConfirmationTokenPrefix + token);
	// 	// update context
	// 	updateUserContext(context, {
	// 		isActive: true,
	// 		emailConfirmed: user.emailConfirmed
	// 	});
	// 	const returnUser: UserResponse = {
	// 		email: updatedUser.email,
	// 		isActive: updatedUser.isActive,
	// 		emailConfirmed: updatedUser.emailConfirmed
	// 	};
	// 	return returnUser;
	// }
}
