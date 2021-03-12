import { StoryResponseDM } from "./../datamappers/StoryResponse.dm";
import { ApolloError } from "apollo-server-express";
import { StoryStatus } from "./../model/Story.model";
import { StoryRepository } from "./../model/Story.repository";
import { StoryResponseType } from "./StoryResponse.type";
import { injectable } from "inversify";
import {
	Resolver,
	Mutation,
	Arg,
	InputType,
	Int,
	Field,
	Authorized
} from "type-graphql";

@InputType()
export class UpdateStoryInputType {
	@Field(() => Int)
	storyId!: number;

	@Field(() => String)
	title!: string;

	@Field(() => String)
	description!: string;

	@Field(() => StoryStatus, { nullable: true })
	status?: StoryStatus;

	@Field({ nullable: true })
	addToActiveSprint?: boolean;

	@Field({ nullable: true })
	removeFromActiveSprint?: boolean;
}

@injectable()
@Resolver()
export class UpdateStoryMutation {
	public constructor(
		private storyRepository: StoryRepository,
		private storyResponseDM: StoryResponseDM
	) {}

	@Authorized()
	@Mutation(() => StoryResponseType)
	public async updateStory(
		@Arg("data") data: UpdateStoryInputType
	): Promise<StoryResponseType> {
		const updatedStory = await this.storyRepository.update(data.storyId, data);

		if (!updatedStory) {
			throw new ApolloError("Story was not updated", "UPDATE_FAIL");
		}

		return this.storyResponseDM.createStoryResponse(updatedStory);
	}
}
