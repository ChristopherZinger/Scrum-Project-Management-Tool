import { StoryResponseDM } from "./../datamappers/StoryResponse.dm";
import { ApolloError } from "apollo-server-express";
import { StoryRepository } from "./../model/Story.repository";
import { StoryResponseType } from "./StoryResponse.type";
import { injectable } from "inversify";
import { Arg, Authorized, Mutation, Int, Resolver } from "type-graphql";

@injectable()
@Resolver()
export class RemoveStoryMutation {
	public constructor(
		private storyRepository: StoryRepository,
		private storyResponseDM: StoryResponseDM
	) {}

	@Authorized()
	@Mutation(() => StoryResponseType)
	public async removeStory(
		@Arg("storyId", () => Int) storyId: number
	): Promise<StoryResponseType> {
		const story = await this.storyRepository.findById(storyId);

		if (!story) {
			console.error("Could not find story with id: ", storyId);
			throw new ApolloError("Could not find requested story", "STORY_MISSING");
		}

		await story.destroy();

		return this.storyResponseDM.createStoryResponse(story);
	}
}
