import {
	ProjectResponseType,
	StoryResponseType,
	SprintResponseType
} from "./../../../types.d";
export enum Action {
	// project
	LOAD_PROJECT = "LOAD_PROJECT",

	// sprint
	CREATE_SPRINT = "CREATE_SPRINT",
	ARCHIVE_SPRINT = "ARCHIVE_SPRINT",

	// story
	CREATE_STORY = "CREATE_STORY",
	UPDATE_STORY = "UPDATE_STORY",
	REMOVE_STORY = "REMOVE_STORY"
}

export type ProjectActionType =
	| {
			type: Action.LOAD_PROJECT;
			data: ProjectResponseType;
	  }
	| {
			type: Action.CREATE_SPRINT;
			data: SprintResponseType;
	  }
	| {
			type: Action.ARCHIVE_SPRINT;
			data: SprintResponseType;
	  }
	| {
			type: Action.CREATE_STORY;
			data: StoryResponseType;
	  }
	| {
			type: Action.UPDATE_STORY;
			data: StoryResponseType;
	  }
	| {
			type: Action.REMOVE_STORY;
			data: StoryResponseType;
	  };
