import { Resolver, Mutation, Ctx } from "type-graphql";
import { ContextType } from "../../../core/context/context-type";
import { CONST } from "../../../core/CONST";
import { injectable } from "inversify";

@injectable()
@Resolver()
export class LogoutMutation {
	@Mutation(() => Boolean)
	async logout(@Ctx() context: ContextType): Promise<boolean> {
		return new Promise((res, rej) =>
			context.session.destroy(err => {
				if (err) {
					console.error(err);
					rej(false);
				}

				context.response.clearCookie(
					CONST.sessionCookieName,
					CONST.sessionCookieOptions
				);
				res(true);
			})
		);
	}
}
