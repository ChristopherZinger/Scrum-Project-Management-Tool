import { Resolver, Query, Ctx } from "type-graphql";
import { ContextType } from "../../../core/create-gql-context";

@Resolver()
export class TestQuery {
	@Query(() => String)
	public test(@Ctx() context: ContextType) {
		console.log(context.session);
		return "hello";
	}
}
