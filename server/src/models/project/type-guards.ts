import { SprintResponseType } from "./../sprint/graphql/SprintResponse.type";
import { StoryResponseType } from "./../story/graphql/StoryResponse.type";

export interface IProjectResponse {
	id: number;
	title: string;
	pid: string | null;
	backlog?: StoryResponseType[];
	activeSprint?: SprintResponseType;
	activeSprintId: number | null;
}
