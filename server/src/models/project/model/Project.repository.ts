import { FindOptions } from "sequelize";
import { CreateProjectInputType } from "./../graphql/createProject.mutation";
import { Project } from "./Project.model";
import { BaseRepository } from "../../../core/base-repository";
import { injectable } from "inversify";

interface CreateProjectInputData extends CreateProjectInputType {
	companyId: number;
}

@injectable()
export class ProjectRepository extends BaseRepository<Project> {
	protected model = Project;

	public async create(data: CreateProjectInputData): Promise<Project> {
		const project = new this.model();
		project.title = data.title;
		project.companyId = data.companyId;
		if (data.pid) {
			project.pid = data.pid;
		}
		return await project.save();
	}

	public async findAllForCompany(
		companyId: number,
		options?: FindOptions
	): Promise<Project[]> {
		return await this.model.findAll({ where: { companyId }, ...options });
	}
}
