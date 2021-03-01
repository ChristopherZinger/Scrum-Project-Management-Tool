import { ISprintResponse } from "./../type-guards";
import { injectable } from "inversify";
import { Sprint } from "../model/Sprint.model";

@injectable()
export class SprintResponseDM {
	public createSprintResponse(sprint: Sprint): ISprintResponse {
		return {
			startsAt: sprint.startsAt,
			endsAt: sprint.endsAt,
			isFinished: sprint.isFinished,
			projectId: sprint.projectId
		};
	}
}
