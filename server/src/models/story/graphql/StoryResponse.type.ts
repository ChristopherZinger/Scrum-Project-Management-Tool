import { StoryStatus } from "./../model/Story.model";
import { IStoryResponse } from "./../type-guards";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class StoryResponseType implements IStoryResponse {
	@Field()
	id!: number;

	@Field()
	title!: string;

	@Field({ nullable: true })
	description!: string | null;

	@Field({ nullable: true })
	status!: StoryStatus;

	@Field({ nullable: true })
	userProfileId!: number | null;

	@Field({ nullable: true })
	sprintId!: number | null;
}
