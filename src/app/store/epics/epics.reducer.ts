import {IEpic} from "../../core/interfaces/epic";
import {createReducer, on} from "@ngrx/store";
import {loadEpics, loadEpicsSuccess} from "./epics.actions";
import {state} from "@angular/animations";
import {loadIssueTypesFailure} from "../issue-types";

export interface  IEpicStateModule{
  epics: IEpic[]
}

const  initialState : IEpicStateModule = {
  epics: []
}

export const epicReducer = createReducer(
  initialState,
  on(loadEpics, (state) => ({...state})),
  on(loadEpicsSuccess, (state, action)=>{
    return {
      ...state,
      epics: action.epics
    }
  }),
  on(loadIssueTypesFailure, (state, {error}) => ({ ...state, error}))
)
