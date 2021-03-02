import { Project } from "./../../project/model/Project.model";
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

		sprint.startsAt = new Date();

		return await this.save(sprint);
	}

	public async findActiveForProject(projectId: number) {
		return await this.model.findOne({
			include: [{ model: Project, where: { id: projectId } }]
		});
	}
}
