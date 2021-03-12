import { StoryResponseType } from "../../story/graphql/StoryResponse.type";
import { SprintResponseDM } from "./../../sprint/datamappers/SprintResponse.dm";
import { ProjectResponseType } from "./../graphql/ProjectResponse.type";
import { StoryResponseDM } from "./../../story/datamappers/StoryResponse.dm";
import { Project } from "./../model/Project.model";
import { injectable } from "inversify";

@injectable()
export class ProjectResponseDM {
	public constructor(
		private storyResponseType: StoryResponseDM,
		private sprintResponseDM: SprintResponseDM
	) {}

	public createProjectResponse(project: Project): ProjectResponseType {
		let stories: StoryResponseType[];
		if (project.stories) {
			stories = project.stories.map(s =>
				this.storyResponseType.createStoryResponse(s)
			);
		} else {
			console.warn(
				"Could not find any stories for project with id: ",
				project.id
			);
			stories = [];
		}

		let activeSprint;
		if (project.activeSprint) {
			activeSprint = this.sprintResponseDM.createSprintResponse(
				project.activeSprint,
				true
			);
		}

		return {
			pid: project.pid || null,
			title: project.title,
			id: project.id,
			backlog: stories,
			activeSprint: activeSprint,
			activeSprintId: project.activeSprintId
		};
	}
}
