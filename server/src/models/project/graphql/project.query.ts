import { Story } from "./../../story/model/Story.model";
import { ApolloError } from "apollo-server-express";
import { ProjectRepository } from "./../model/Project.repository";
import { ProjectResponseDM } from "./../datamappers/ProjectResponse.dm";

import { Int, Query, Resolver, Arg } from "type-graphql";
import { injectable } from "inversify";
import { ProjectResponseType } from "./ProjectResponse.type";

@injectable()
@Resolver()
export class ProjectQuery {
	public constructor(
		private projectResponseDM: ProjectResponseDM,
		private projectRepository: ProjectRepository
	) {}

	@Query(() => ProjectResponseType)
	public async project(
		@Arg("projectId", () => Int) projectId: number
	): Promise<ProjectResponseType> {
		let project;
		try {
			project = await this.projectRepository.findById(projectId, {
				include: [{ model: Story }]
			});
		} catch (err) {
			console.error(err);
		}

		if (!project) {
			throw new ApolloError(
				"Can't find project with this id",
				"PROJECT_MISSSING"
			);
		}
		return this.projectResponseDM.createProjectResponse(project);
	}
}
