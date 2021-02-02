import { Resolver, Query, Ctx } from "type-graphql";
import { UserType } from "./user.type";
import { ContextType } from "../../../core/context/context-type";

@Resolver()
export class UserQuery {
	@Query(() => [UserType], { nullable: true })
	async user(@Ctx() ctx: ContextType): Promise<UserType[] | null> {
		return null;
		//     return await ctx.dbConnection.getRepository(User).find()
	}
}
