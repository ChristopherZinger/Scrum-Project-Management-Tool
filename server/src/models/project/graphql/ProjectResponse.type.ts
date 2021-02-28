import { IProjectResponse } from "./../type-guards";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ProjectResponseType implements IProjectResponse {
	@Field()
	pid?: string;

	@Field()
	title!: string;

	@Field()
	companyId!: number;
}
