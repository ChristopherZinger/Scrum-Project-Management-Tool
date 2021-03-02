import { ProjectRepository } from "./../../project/model/Project.repository";
import { ApolloError } from "apollo-server-express";
import { SprintResponseDM } from "../datamappers/SprintResponse.dm";
import { SprintRepository } from "../model/Sprint.repository";
import { SprintResponseType } from "./SprintResponse.type";
import { injectable } from "inversify";
import { Mutation, Resolver, Authorized, Int, Arg } from "type-graphql";

@injectable()
@Resolver()
export class ArchiveActiveSprintMutation {
	public constructor(
		private sprintResponseDM: SprintResponseDM,
		private sprintRepository: SprintRepository,
		private projectRepository: ProjectRepository
	) {}

	@Authorized()
	@Mutation(() => SprintResponseType)
	public async archiveActiveSprint(
		@Arg("projectId", () => Int) projectId: number
	): Promise<SprintResponseType> {
		const sprint = await this.sprintRepository.findActiveForProject(projectId);
		if (!sprint) {
			throw new ApolloError(
				`Can't find active sprint for project with id ${projectId}`,
				"SPRINT_MISSING"
			);
		}

		if (!sprint.project) {
			throw new ApolloError(
				`Project for this sprint is missing`,
				"PROJECT_MISSING"
			);
		}

		sprint.isFinished = true;
		const updatedSprint = await this.sprintRepository.save(sprint);

		sprint.project.activeSprintId = null;
		await this.projectRepository.save(sprint.project);

		return this.sprintResponseDM.createSprintResponse(updatedSprint);
	}
}
