import { Project } from "./../model/Project.model";
import { ProjectResponseDM } from "./../datamappers/ProjectResponse.dm";
import { ProjectRepository } from "./../model/Project.repository";
import { ProjectResponseType } from "./ProjectResponse.type";
import { ContextType } from "./../../../core/context/context-type";
import { injectable } from "inversify";
import { Ctx, Resolver, Query } from "type-graphql";
import customApolloErrors from "../../../core/formatErrors/custom-apollo-errors";

@injectable()
@Resolver()
export class ProjectsQuery {
	public constructor(
		private projectRepository: ProjectRepository,
		private projectResponseDM: ProjectResponseDM
	) {}

	@Query(() => [ProjectResponseType])
	public async projects(
		@Ctx() context: ContextType
	): Promise<ProjectResponseType[]> {
		if (!context.session.user?.companyId) {
			throw customApolloErrors.sessionError(
				undefined,
				"Session is missing user or companyId"
			);
		}

		const projects = await this.projectRepository.findAllForCompany(
			context.session.user.companyId
		);

		const projectList = projects.map((project: Project) =>
			this.projectResponseDM.createProjectResponse(project)
		);

		return projectList;
	}
}
