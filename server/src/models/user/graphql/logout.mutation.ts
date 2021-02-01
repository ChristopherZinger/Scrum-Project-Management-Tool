import { Resolver, Mutation, Ctx } from "type-graphql";
import { ContextType } from "../../../core/create-gql-context";

@Resolver()
export class LogoutMutation {
	@Mutation(() => Boolean)
	async logout(@Ctx() ctx: ContextType): Promise<boolean> {
		return new Promise((res, rej) =>
			ctx.request.session.destroy(err => {
				if (err) {
					console.error(err);
					rej(false);
				}
				res(true);
			})
		);
	}
}
