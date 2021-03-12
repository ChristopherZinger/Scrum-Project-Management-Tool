import { StoryStatus } from "./model/Story.model";
export interface IStoryResponse {
	id: number;
	title: string;
	description?: string;
	status: StoryStatus;
	userProfileId: number | null;
	sprintId: number | null;
}
