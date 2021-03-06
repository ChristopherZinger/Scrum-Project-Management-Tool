import { StoryResponseType } from "./../graphql/StoryResponse.type";
import { injectable } from "inversify";
import { Story } from "../model/Story.model";

@injectable()
export class StoryResponseDM {
	public createStoryResponse(story: Story): StoryResponseType {
		return {
			id: story.id,
			title: story.title,
			description: story.description,
			status: story.status,
			userProfileId: story.userProfileId,
			sprintId: story.sprintId
		};
	}
}
