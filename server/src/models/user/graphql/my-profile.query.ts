import { Resolver, Query, Ctx } from "type-graphql";
import { UserResponse } from "./user-response.type";
import { ContextType } from "../../../core/context/context-type";

@Resolver()
export class MyProfileQuery {
	@Query(() => UserResponse, { nullable: true })
	public async user(@Ctx() context: ContextType): Promise<UserResponse | null> {
		if (!context.session.user) {
			return null;
		}

		const user = context.session.user;
		if (user) {
			return {
				email: user.email,
				isActive: user.isActive,
				emailConfirmed: user.emailConfirmed
			};
		}

		return null;
	}
}
