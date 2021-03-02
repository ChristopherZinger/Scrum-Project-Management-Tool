import { StoryType } from "./../../story/graphql/Story.type";
import { CompanyType } from "./../../company/graphql/company.type";
import { ObjectType, Field, ID } from "type-graphql";
import { SprintType } from "../../sprint/graphql/Sprint.type";

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

	@Field(() => [SprintType])
	sprints!: SprintType[];

	@Field()
	activeSprintId!: number;

	@Field(() => SprintType)
	activeSprint?: SprintType;

	@Field(() => [StoryType])
	stories!: StoryType[];
}
