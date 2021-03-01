import { ApolloError } from "apollo-server-express";
import { SprintResponseDM } from "./../datamappers/SprintResponse.dm";
import { SprintRepository } from "./../model/Sprint.repository";
import { SprintResponseType } from "./SprintResponse.type";
import { injectable } from "inversify";
import { Mutation, Resolver, Authorized, Int, Arg } from "type-graphql";

@injectable()
@Resolver()
export class ArchiveSprintMutation {
	public constructor(
		private sprintResponseDM: SprintResponseDM,
		private sprintRepository: SprintRepository
	) {}

	@Authorized()
	@Mutation(() => SprintResponseType)
	public async archiveSprint(
		@Arg("sprintId", () => Int) sprintId: number
	): Promise<SprintResponseType> {
		const sprint = await this.sprintRepository.findById(sprintId);
		if (!sprint) {
			throw new ApolloError(
				`Sprint with id: ${sprintId} not found`,
				"SPRINT_MISSING"
			);
		}
		sprint.isFinished = true;
		const updatedSprint = await this.sprintRepository.save(sprint);

		return this.sprintResponseDM.createSprintResponse(updatedSprint);
	}
}
