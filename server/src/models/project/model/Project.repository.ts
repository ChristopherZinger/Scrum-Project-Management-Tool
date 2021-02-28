import { CreateProjectInputType } from "./../graphql/createProject.mutation";
import { Project } from "./Project.model";
import { BaseRepository } from "../../../core/base-repository";
import { injectable } from "inversify";

interface CreateProjectData extends CreateProjectInputType {
	companyId: number;
}

@injectable()
export class ProjectRepository extends BaseRepository<Project> {
	protected model = Project;

	public async create(data: CreateProjectData): Promise<Project> {
		const project = new this.model();
		project.title = data.title;
		project.companyId = data.companyId;
		if (project.pid) {
			project.pid = data.pid;
		}
		const newProject = await project.save();

		return newProject;
	}
}
