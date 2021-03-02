import { IStoryResponse } from "./../type-guards";
import { injectable } from "inversify";
import { Story } from "../model/Story.model";

@injectable()
export class StoryResponseDM {
	public createStoryResponse(story: Story): IStoryResponse {
		return {
			id: story.id,
			title: story.title,
			description: story.description,
			status: story.status,
			projectId: story.projectId,
			sprintId: story.sprintId
		};
	}
}
