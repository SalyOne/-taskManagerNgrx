import {createAction, props} from "@ngrx/store";


export const loadProjects = createAction(
  '[Project] Load Projects'
)
export const loadProjectsSuccess = createAction(
  '[Project] Load Projects Success',
  props<{data: any}>()
)
export const loadProjectsFailure = createAction(
  '[Project] Load Projects Failure',
  props<{error: any}>()
)

export const setProjects = createAction(
  '[Project] Set Projects',
  props<{projectId: number}>()
)
export const initCurrentProject = createAction(
  '[Project] Init Current Project'
)
export const createProject = createAction(
  '[Project] Create Project',
  props<{project: any}>()
)
export const updateProject = createAction(
  '[Project] Update Project',
  props<{project: any}>()
)
