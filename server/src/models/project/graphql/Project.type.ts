import { CompanyType } from "./../../company/graphql/company.type";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class ProjectType {
	@Field(() => ID)
	id!: number;

	@Field()
	title!: string;

	@Field()
	pid?: string;

	@Field()
	companyId!: number;

	@Field(() => CompanyType)
	company!: CompanyType;
}
