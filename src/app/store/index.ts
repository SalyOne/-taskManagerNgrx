import {ActionReducerMap} from "@ngrx/store";
import {projectReducer, ProjectStateModule} from "./project";
import {boardReducer, BoardStateModule} from "./board";

export * from './project'
export * from './board'

export  interface AppState{
  project: ProjectStateModule,
  board: BoardStateModule;
}
export const  reducers: ActionReducerMap<AppState> ={
  project: projectReducer,
  board: boardReducer,

}
