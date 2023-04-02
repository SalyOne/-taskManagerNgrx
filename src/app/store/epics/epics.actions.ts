import {createAction, props} from "@ngrx/store";
import {IEpic} from "../../core/interfaces/epic";


export const loadEpics =  createAction(
  '[Epics] Load Epics'
)
export const loadEpicsSuccess =  createAction(
  '[Epics] Load Epics Success',
  props<{epics:any}>()
)
export const loadEpicsFailure =  createAction(
  '[Epics] Load Epics Failure',
  props<{error:any}>()
)
export const updateEpics =  createAction(
  '[Epics] Update Epics',
    props<{epics:IEpic, projectId: number}>()
)
export const createEpics =  createAction(
  '[Epics] Create Epics',
  props<{epics:IEpic, projectId: number}>()
)
export const deleteEpics =  createAction(
  '[Epics] Delete Epics',
  props<{epicId:number}>()
)
