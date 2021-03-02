import { StoryStatus } from "./model/Story.model";
export interface IStoryResponse {
	id: number;
	title: string;
	description: string | null;
	status: StoryStatus | null;
	projectId: number;
	sprintId: number | null;
}
