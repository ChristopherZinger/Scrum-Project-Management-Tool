import { ProjectResponseType } from "./../graphql/ProjectResponse.type";
import { StoryResponseDM } from "./../../story/datamappers/StoryResponse.dm";
import { Project } from "./../model/Project.model";
import { injectable } from "inversify";

@injectable()
export class ProjectResponseDM {
	public constructor(private storyResponseType: StoryResponseDM) {}

	public createProjectResponse(project: Project): ProjectResponseType {
		let stories;
		if (project.stories) {
			stories = project.stories
				.map(s => this.storyResponseType.createStoryResponse(s))
				.filter(s => !!s.sprintId);
		}
		return {
			pid: project.pid || null,
			title: project.title,
			id: project.id,
			backlog: stories
		};
	}
}
