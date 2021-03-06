import {
	ProjectResponseType,
	StoryResponseType,
	SprintResponseType
} from "../../../types.d";
import { Action, ProjectActionType } from "./actions";
import { ProjectContextType } from "./ProjectContext";

function loadProjectReducer(data: ProjectResponseType): ProjectContextType {
	return { project: data };
}

function createSprintReducer(
	state: ProjectContextType,
	data: SprintResponseType
): ProjectContextType {
	if (!state.project) return { ...state };
	return {
		...state,
		project: {
			...state.project,
			activeSprintId: data.isActive ? data.id : state.project.activeSprint?.id,
			activeSprint: data.isActive ? data : state.project.activeSprint
		}
	};
}

function archiveSprintReducer(
	state: ProjectContextType,
	data: SprintResponseType
): ProjectContextType {
	if (!state.project) return { ...state };
	return {
		...state,
		project: {
			...state.project,
			activeSprintId: null,
			activeSprint: undefined
		}
	};
}

function createStoryReducer(
	state: ProjectContextType,
	data: StoryResponseType
): ProjectContextType {
	if (!state.project) return { ...state };
	const newBacklog = state.project.backlog
		? [...state.project.backlog, data]
		: [data];
	return {
		...state,
		project: {
			...state.project,
			backlog: newBacklog
		}
	};
}

function updateStoryReducer(
	state: ProjectContextType,
	data: StoryResponseType
): ProjectContextType {
	if (!state.project) return { ...state };
	const updatedBacklog = state.project.backlog
		? [...state.project.backlog.filter(story => story.id !== data.id), data]
		: [data];
	return {
		...state,
		project: {
			...state.project,
			backlog: updatedBacklog
		}
	};
}

export function projectReducer(
	state: ProjectContextType,
	action: ProjectActionType
): ProjectContextType {
	switch (action.type) {
		// PROJECT
		case Action.LOAD_PROJECT:
			return loadProjectReducer(action.data);

		// SPRINT
		case Action.CREATE_SPRINT:
			return createSprintReducer(state, action.data);

		case Action.ARCHIVE_SPRINT:
			return archiveSprintReducer(state, action.data);

		// STORY
		case Action.CREATE_STORY:
			return createStoryReducer(state, action.data);

		case Action.UPDATE_STORY:
			return updateStoryReducer(state, action.data);

		default:
			return state;
	}
}
