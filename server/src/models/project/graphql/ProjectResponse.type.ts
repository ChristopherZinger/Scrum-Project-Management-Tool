import { SprintResponseType } from "./../../sprint/graphql/SprintResponse.type";
import { StoryResponseType } from "./../../story/graphql/StoryResponse.type";
import { IProjectResponse } from "./../type-guards";
import { Field, ObjectType, Int } from "type-graphql";

@ObjectType()
export class ProjectResponseType implements IProjectResponse {
	@Field(() => Int)
	id!: number;

	@Field(() => String, { nullable: true })
	pid!: string | null;

	@Field()
	title!: string;

	@Field(() => [StoryResponseType], { nullable: true })
	backlog?: StoryResponseType[];

	@Field(() => SprintResponseType, { nullable: true })
	activeSprint?: SprintResponseType;

	@Field(() => Int, { nullable: true })
	activeSprintId!: number | null;
}
