import { ProjectResponseType, StoryResponseType } from "../../../types.d";
import { Action, ProjectActionType } from "./actions";
import { ProjectContextType } from "./ProjectContext";

function loadProjectReducer(data: ProjectResponseType): ProjectContextType {
	return { project: data };
}

function createStoryReducer(
	state: ProjectContextType,
	data: StoryResponseType
): ProjectContextType {
	if (state.project) {
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
	} else {
		return { ...state };
	}
}

function updateStoryReducer(
	state: ProjectContextType,
	data: StoryResponseType
): ProjectContextType {
	if (state.project) {
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
	} else {
		return { ...state };
	}
}

export function projectReducer(
	state: ProjectContextType,
	action: ProjectActionType
): ProjectContextType {
	switch (action.type) {
		case Action.LOAD_PROJECT:
			return loadProjectReducer(action.data);

		case Action.CREATE_STORY:
			return createStoryReducer(state, action.data);

		case Action.UPDATE_STORY:
			return updateStoryReducer(state, action.data);

		default:
			return state;
	}
}
