import { Resolver, Query, Ctx } from "type-graphql";
import { ContextType } from "../../../core/context/context-type";

@Resolver()
export class TestQuery {
	@Query(() => String)
	public test(@Ctx() context: ContextType) {
		console.log("test query");
		return "hello";
	}
}
