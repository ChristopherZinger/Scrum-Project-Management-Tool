import { ProjectResponseType, StoryResponseType } from "./../../../types.d";
export enum Action {
	// project
	LOAD_PROJECT = "LOAD_PROJECT",

	// sprint

	// story
	CREATE_STORY = "CREATE_STORY",
	UPDATE_STORY = "UPDATE_STORY"
}

export type ProjectActionType =
	| {
			type: Action.LOAD_PROJECT;
			data: ProjectResponseType;
	  }
	| {
			type: Action.CREATE_STORY;
			data: StoryResponseType;
	  }
	| {
			type: Action.UPDATE_STORY;
			data: StoryResponseType;
	  };
