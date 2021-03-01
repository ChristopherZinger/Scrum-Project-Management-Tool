import { Project } from "./../../../../../src/application/pages/Dashboard/Project/Project";
import { ProjectRepository } from "./../../project/model/Project.repository";
import { ApolloError } from "apollo-server-express";
import { SprintResponseType } from "./SprintResponse.type";
import { ContextType } from "./../../../core/context/context-type";
import { SprintRepository } from "./../model/Sprint.repository";
import { injectable } from "inversify";
import { Mutation, Resolver, Ctx, Arg, Int } from "type-graphql";
import { SprintResponseDM } from "../datamappers/SprintResponse.dm";
import dayjs from "dayjs";

@injectable()
@Resolver()
export class CreateSprintMutation {
	constructor(
		private sprintResponseDM: SprintResponseDM,
		private sprintRepository: SprintRepository,
		private projectRepository: ProjectRepository
	) {}
	@Mutation(() => SprintResponseType)
	public async createSprint(
		@Ctx() context: ContextType,
		@Arg("setAsActiveSprint") setAsActiveSprint: boolean,
		@Arg("projectId", () => Int) projectId: number
	): Promise<SprintResponseType> {
		if (!context.session.user?.companyId) {
			throw new Error("Session is missing companyId");
		}

		const endsAt = dayjs().add(2, "weeks").toDate();

		const sprint = await this.sprintRepository.createSprint({
			endsAt,
			projectId
		});

		if (!sprint) {
			throw new ApolloError("Sprint was not created.", "SPRINT_NOT_CREATED");
		}

		if (setAsActiveSprint) {
			const project = await this.projectRepository.findById(projectId);

			if (!project) {
				throw new ApolloError(
					`Project with id ${projectId} not found`,
					"PROJECT_MISSING"
				);
			}

			if (project.activeSprint) {
				throw new ApolloError(
					"This project already has active sprint. First finish current sprint and then create new active sprint",
					"PROJECT_HAS_ACTIVE_SPRINT"
				);
			}

			project.activeSprintId = sprint.id;
			await this.projectRepository.save(project);
		}

		return this.sprintResponseDM.createSprintResponse(sprint);
	}
}
