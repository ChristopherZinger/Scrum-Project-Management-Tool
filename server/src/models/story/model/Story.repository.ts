import { Story } from "./Story.model";
import { BaseRepository } from "../../../core/base-repository";
import { injectable } from "inversify";
import { CreateStoryInputType } from "../graphql/createStory.mutation";

@injectable()
export class StoryRepository extends BaseRepository<Story> {
	protected model = Story;

	public async createStory(data: CreateStoryInputType): Promise<Story> {
		const story = new this.model();
		story.title = data.title;
		story.projectId = data.projectId;
		if (data.description) {
			story.description = data.description;
		}
		if (data.userProfileId) {
			story.userProfileId = data.userProfileId;
		}
		if (data.sprintId) {
			story.sprintId = data.sprintId;
		}

		return await this.save(story);
	}
}
