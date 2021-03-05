import React, { createContext, useEffect, useReducer } from "react";
import { useParams } from "react-router";
import { ProjectResponseType, StoryResponseType, useProjectQuery } from "../../../types.d";
import { Action } from "./actions";
import { projectReducer } from "./reducers";

export type ProjectContextType = {
  project: null | ProjectResponseType
}

type Props = {
  children: React.ReactNode
}

interface IActionDispatch {
  loadProject: (data: ProjectResponseType) => void,
  createStory: (data: StoryResponseType) => void,
  updateStory: (data: StoryResponseType) => void,
}

const initialValue: ProjectContextType = { project: null };
export const ProjectContext = createContext(initialValue)
export const ProjectDispatch = createContext<IActionDispatch | undefined>(undefined)

export const ProjectContextWrapper = (props: Props) => {

  const params = useParams<{ id: string }>();
  const [state, dispatch] = useReducer(projectReducer, initialValue)
  const { data } = useProjectQuery({ variables: { projectId: parseInt(params.id, 10) } })

  const actions: IActionDispatch = {
    loadProject: (data: ProjectResponseType) => dispatch({ type: Action.LOAD_PROJECT, data }),
    createStory: (data: StoryResponseType) => dispatch({ type: Action.CREATE_STORY, data }),
    updateStory: (data: StoryResponseType) => dispatch({ type: Action.UPDATE_STORY, data })
  }

  useEffect(() => {
    if (data) {
      actions.loadProject(data.project)
    }
  }, [data])

  return (
    <ProjectDispatch.Provider value={actions}>
      <ProjectContext.Provider value={state}>
        {props.children}
      </ProjectContext.Provider>
    </ProjectDispatch.Provider>
  )
}