import { StoryStatus } from "../model/Story.model";
import { IStoryResponse } from "./../type-guards";
import { ApolloError } from "apollo-server-express";
import { StoryResponseDM } from "./../datamappers/StoryResponse.dm";
import { StoryRepository } from "./../model/Story.repository";
import { ContextType } from "./../../../core/context/context-type";
import { StoryResponseType } from "./StoryResponse.type";
import { injectable } from "inversify";
import {
	Authorized,
	Ctx,
	Arg,
	InputType,
	Mutation,
	Resolver,
	Field,
	Int
} from "type-graphql";

@InputType()
export class CreateStoryInputType {
	@Field()
	title!: string;

	@Field({ defaultValue: "" })
	description!: string;

	@Field(() => Int)
	projectId!: number;

	@Field(() => StoryStatus, { defaultValue: StoryStatus.BACKLOG })
	status!: StoryStatus;

	@Field({ nullable: true })
	sprintId?: number;

	@Field({ nullable: true })
	userProfileId?: number;
}

@injectable()
@Resolver()
export class CreateStoryMutation {
	public constructor(
		private storyRepository: StoryRepository,
		private storyResponseDM: StoryResponseDM
	) {}

	@Authorized()
	@Mutation(() => StoryResponseType)
	public async createStory(
		@Arg("data") data: CreateStoryInputType,
		@Ctx() context: ContextType
	): Promise<IStoryResponse> {
		const story = await this.storyRepository.createStory(data);
		if (!story) {
			throw new ApolloError("Story was not created", "STORY_NOT_CREATED");
		}

		return this.storyResponseDM.createStoryResponse(story);
	}
}
