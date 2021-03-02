import { StoryType } from "./../../story/graphql/Story.type";
import { CompanyType } from "../../company/graphql/company.type";
import { ObjectType, Field, ID } from "type-graphql";
import { UserType } from "../../user/graphql/user.type";

@ObjectType()
export class UserProfileType {
	@Field(() => ID)
	id!: number;

	@Field()
	firstname!: string;

	@Field()
	lastname!: string;

	@Field(() => UserType, { nullable: true })
	user!: UserType;

	@Field()
	userId?: number;

	@Field(() => CompanyType, { nullable: true })
	company?: CompanyType;

	@Field()
	companyId?: number;

	@Field(() => [StoryType])
	stories!: StoryType[];
}
