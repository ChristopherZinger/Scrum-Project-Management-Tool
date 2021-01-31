import { Resolver, Mutation, Ctx } from "type-graphql";
import { getRepository } from "typeorm";
import { UserResponse } from "./register.mutation";
import { ContextType } from "../../../core/create-gql-context";
import bcrypt from "bcryptjs";
import { User } from "../model/User.model";

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
				ctx.response.clearCookie("qid");
				res(true);
			})
		);
	}
}
