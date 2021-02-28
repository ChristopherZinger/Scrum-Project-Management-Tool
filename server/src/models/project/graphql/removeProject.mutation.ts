import { ApolloError } from "apollo-server-express";
import { ProjectRepository } from "./../model/Project.repository";
import { ProjectResponseType } from "../graphql/ProjectResponse.type";
import { ContextType } from "./../../../core/context/context-type";
import { injectable } from "inversify";
import { Resolver, Mutation, Ctx, Arg, Authorized, Int } from "type-graphql";
import { ProjectResponseDM } from "../datamappers/ProjectResponse.dm";

@injectable()
@Resolver()
export class RemoveProject {
	public constructor(
		private projectRepository: ProjectRepository,
		private projectResponseDM: ProjectResponseDM
	) {}

	@Authorized()
	@Mutation(() => ProjectResponseType)
	public async removeProject(
		@Ctx() context: ContextType,
		@Arg("projectId", () => Int) projectId: number
	): Promise<ProjectResponseType> {
		const project = await this.projectRepository.findById(projectId);

		if (!project) {
			throw new ApolloError(
				"Project with this ID does not exist",
				"PROJECT_MISSING"
			);
		}

		project.destroy();

		return this.projectResponseDM.createProjectResponse(project);
	}
}
