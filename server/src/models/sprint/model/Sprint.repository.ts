import { BaseRepository } from "../../../core/base-repository";
import { injectable } from "inversify";
import { Sprint } from "./Sprint.model";

@injectable()
export class SprintRepository extends BaseRepository<Sprint> {
	protected model = Sprint;

	public async createSprint(data: {
		startsAt?: Date;
		endsAt: Date;
		projectId: number;
	}): Promise<Sprint> {
		const sprint = new this.model();
		sprint.endsAt = data.endsAt;
		sprint.projectId = data.projectId;
		if (data.startsAt) {
			sprint.startsAt = data.startsAt;
		}
		return await this.save(sprint);
	}
}
