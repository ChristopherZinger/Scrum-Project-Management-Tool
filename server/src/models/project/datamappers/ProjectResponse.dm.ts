import { ProjectResponseType } from "../graphql/ProjectResponse.type";
import { Project } from "./../model/Project.model";
import { injectable } from "inversify";

@injectable()
export class ProjectResponseDM {
	public createProjectResponse(project: Project): ProjectResponseType {
		return {
			pid: project.pid || null,
			title: project.title,
			id: project.id
		};
	}
}
