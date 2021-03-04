import { StoryStatus } from "./../model/Story.model";
import { IStoryResponse } from "./../type-guards";
import { Field, Int, ObjectType, registerEnumType } from "type-graphql";

// register to graphql
registerEnumType(StoryStatus, {
	name: "StoryStatus"
});

@ObjectType()
export class StoryResponseType implements IStoryResponse {
	@Field()
	id!: number;

	@Field()
	title!: string;

	@Field(() => String, { nullable: true })
	description!: string | null;

	@Field(() => StoryStatus)
	status!: StoryStatus;

	@Field(() => Int, { nullable: true })
	userProfileId!: number | null;

	@Field(() => Int, { nullable: true })
	sprintId!: number | null;
}
