import { CompanyType } from "@/models/company/graphql/company.type";
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
}
