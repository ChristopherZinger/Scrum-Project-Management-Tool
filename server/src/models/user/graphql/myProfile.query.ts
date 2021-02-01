import { Resolver, Query, Ctx, Authorized } from "type-graphql";
import { UserResponse } from "../graphql/register.mutation";
import { ContextType } from "../../../core/create-gql-context";
import { Permission } from "../../../core/authorization/permissions";
import { AccessGroup } from "../../../core/authorization/access-groups";

@Resolver()
export class MyProfileQuery {
	@Authorized([Permission.READ_OWN_ACCOUNT, AccessGroup.BASE_USER])
	@Query(() => UserResponse, { nullable: true })
	public async myProfile(
		@Ctx() context: ContextType
	): Promise<UserResponse | null> {
		if (!context.session.user) {
			return null;
		}

		const user = context.session.user;
		if (user) {
			return { email: user.email };
		}
		return null;
	}
}
