import { Story, StoryStatus } from "./Story.model";
import { BaseRepository } from "../../../core/base-repository";
import { injectable } from "inversify";
import { CreateStoryInputType } from "../graphql/createStory.mutation";
import { UpdateStoryInputType } from "../graphql/updateStory.mutation";
import { Project } from "../../project/model/Project.model";

@injectable()
export class StoryRepository extends BaseRepository<Story> {
	protected model = Story;

	public async createStory(data: CreateStoryInputType): Promise<Story> {
		const story = new this.model();
		story.title = data.title;
		story.projectId = data.projectId;

		if (!data.status) {
			story.status = StoryStatus.BACKLOG;
		} else {
			story.status = data.status;
		}

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

	public async update(storyId: number, data: UpdateStoryInputType) {
		const story = await this.findById(storyId, {
			include: [{ model: Project }]
		});

		if (!story) {
			throw new Error(`Cant't find story with id: ${storyId}`);
		}

		if (data.addToActiveSprint) {
			if (!story.project) {
				throw new Error(
					`Could not laod project with id: ${story.projectId} for story with id: ${story.id}`
				);
			}
			story.sprintId = story.project.activeSprintId;
		}
		if (data.status) {
			if (!Object.values(StoryStatus).includes(data.status)) {
				throw new Error(
					`Incorrect status. "${data.status}" doesn't exist on StoryStatus.`
				);
			}
			story.status = data.status;
		}

		return await this.save(story);
	}
}
