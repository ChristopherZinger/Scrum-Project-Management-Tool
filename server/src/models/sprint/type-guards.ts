export interface ISprintResponse {
	id: number;
	startsAt: Date;
	endsAt: Date;
	projectId: number;
	isFinished: boolean;
	isActive: boolean;
}
