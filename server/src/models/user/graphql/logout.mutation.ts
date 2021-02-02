import { Resolver, Mutation, Ctx } from "type-graphql";
import { ContextType } from "../../../core/context/context-type";

@Resolver()
export class LogoutMutation {
	@Mutation(() => Boolean)
	async logout(@Ctx() ctx: ContextType): Promise<boolean> {
		return new Promise((res, rej) =>
			ctx.session.destroy(err => {
				if (err) {
					console.error(err);
					rej(false);
				}
				res(true);
			})
		);
	}
}
