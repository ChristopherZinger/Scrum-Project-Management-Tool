import { ProjectRepository } from "./../../project/model/Project.repository";
import { ApolloError } from "apollo-server-express";
import { SprintResponseType } from "./SprintResponse.type";
import { ContextType } from "./../../../core/context/context-type";
import { SprintRepository } from "./../model/Sprint.repository";
import { injectable, inject } from "inversify";
import { Mutation, Resolver, Ctx, Arg, Int } from "type-graphql";
import { SprintResponseDM } from "../datamappers/SprintResponse.dm";
import dayjs from "dayjs";
import { TYPES } from "../../../core/TYPES";
import { Sequelize } from "sequelize-typescript";

@injectable()
@Resolver()
export class CreateSprintMutation {
	constructor(
		private sprintResponseDM: SprintResponseDM,
		private sprintRepository: SprintRepository,
		private projectRepository: ProjectRepository,
		@inject(TYPES.Sequelize) private sequelize: Sequelize
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

		const project = await this.projectRepository.findById(projectId);

		if (!project) {
			throw new ApolloError(
				`Project with id ${projectId} not found`,
				"PROJECT_MISSING"
			);
		}

		if (setAsActiveSprint && project.activeSprint) {
			throw new ApolloError(
				"This project already has active sprint. First finish current sprint and then create new active sprint",
				"PROJECT_HAS_ACTIVE_SPRINT"
			);
		}

		return await this.sequelize.transaction(async () => {
			const sprint = await this.sprintRepository.createSprint({
				endsAt,
				projectId
			});

			if (!sprint) {
				throw new ApolloError("Sprint was not created.", "SPRINT_NOT_CREATED");
			}

			if (setAsActiveSprint) {
				project.activeSprintId = sprint.id;
				const updatedProject = await this.projectRepository.save(project);
				if (!updatedProject) {
					throw new ApolloError(
						"Sprint was not set as active.",
						"SPRINT_ACTIVE_FAIL"
					);
				}
			}
			return this.sprintResponseDM.createSprintResponse(
				sprint,
				setAsActiveSprint
			);
		});
	}
}
