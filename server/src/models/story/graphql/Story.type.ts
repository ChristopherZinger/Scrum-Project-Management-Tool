import { ProjectType } from "./../../project/graphql/Project.type";
import { StoryStatus } from "./../model/Story.model";
import { Field, ObjectType, ID, Int } from "type-graphql";
import { SprintType } from "../../sprint/graphql/Sprint.type";

@ObjectType()
export class StoryType {
	@Field(() => ID)
	id!: number;

	@Field(() => String)
	title!: string;

	@Field(() => String, { nullable: true })
	description!: string | null;

	@Field(() => StoryStatus, { nullable: true })
	status!: StoryStatus | null;

	@Field(() => Int, { nullable: true })
	userProfileId!: number | null;

	@Field(() => ProjectType)
	userProfile?: ProjectType;

	@Field(() => Int, { nullable: true })
	sprintId!: number | null;

	@Field(() => SprintType, { nullable: true })
	sprint!: SprintType | null;
}
