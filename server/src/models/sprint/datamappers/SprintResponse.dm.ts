import { SprintResponseType } from "../graphql/SprintResponse.type";
import { injectable } from "inversify";
import { Sprint } from "../model/Sprint.model";

@injectable()
export class SprintResponseDM {
	public createSprintResponse(
		sprint: Sprint,
		isActive: boolean
	): SprintResponseType {
		return {
			id: sprint.id,
			startsAt: sprint.startsAt,
			endsAt: sprint.endsAt,
			isFinished: sprint.isFinished,
			projectId: sprint.projectId,
			isActive
		};
	}
}
