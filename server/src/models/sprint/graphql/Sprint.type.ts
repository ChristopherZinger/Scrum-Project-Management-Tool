import { StoryType } from "./../../story/graphql/Story.type";
import { ProjectType } from "./../../project/graphql/Project.type";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class SprintType {
	@Field(() => ID)
	id!: number;

	@Field()
	startsAt!: Date;

	@Field()
	endsAt!: Date;

	@Field()
	isFinished!: boolean;

	@Field()
	projectId!: number;

	@Field(() => ProjectType)
	project?: ProjectType;

	@Field(() => [StoryType])
	stories!: StoryType[];
}
