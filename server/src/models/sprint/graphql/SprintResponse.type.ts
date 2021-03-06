import { ISprintResponse } from "./../type-guards";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class SprintResponseType implements ISprintResponse {
	@Field(() => Int)
	id!: number;

	@Field(() => Int)
	projectId!: number;

	@Field()
	startsAt!: Date;

	@Field()
	endsAt!: Date;

	@Field()
	isFinished!: boolean;

	@Field()
	isActive!: boolean;
}
