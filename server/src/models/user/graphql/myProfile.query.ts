import { Resolver, Query, Ctx } from "type-graphql";
import { UserResponse } from "../graphql/register.mutation";
import { ContextType } from "../../../core/create-gql-context";

@Resolver()
class MyProfileQuery {
	@Query(() => UserResponse, { nullable: true })
	public async myProfile(
		@Ctx() context: ContextType
	): Promise<UserResponse | null> {
		const user = context.request.session.user;
		if (user) {
			return { email: user.email };
		}
		return null;
	}
}
