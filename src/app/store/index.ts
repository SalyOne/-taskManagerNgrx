import {ActionReducerMap} from "@ngrx/store";
import {projectReducer, ProjectStateModule} from "./project";
import {boardReducer, BoardStateModule} from "./board";
import {issueTypeReducer, IssueTypesStateModule} from "./issue-types";
import {epicReducer, IEpicStateModule} from "./epics";


export * from './project'
export * from './board'

export  interface AppState{
  project: ProjectStateModule,
  board: BoardStateModule,
  issueType: IssueTypesStateModule,
  epic: IEpicStateModule,
}
export const  reducers: ActionReducerMap<AppState> ={
  project: projectReducer,
  board: boardReducer,
  issueType: issueTypeReducer,
  epic: epicReducer
}
