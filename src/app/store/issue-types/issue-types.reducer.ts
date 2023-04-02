import {IIssueType} from "../../core/interfaces/issue-type";
import {createReducer, on} from "@ngrx/store";
import {loadIssueTypes, loadIssueTypesFailure, loadIssueTypesSuccess} from "./issue-types.actions";


export  interface  IssueTypesStateModule{
  issueTypes: IIssueType[]
}

const  initialState :IssueTypesStateModule= {
  issueTypes:[]
}

export const issueTypeReducer = createReducer(
  initialState,
  on(loadIssueTypes, (state) => ({...state,loading: true})),
  on(loadIssueTypesSuccess,(state, action)=>{
    return {
      ...state,
      issueTypes: action.issueTypes
    }
  }),
  on(loadIssueTypesFailure, (state, {error})=>({...state, error, loading: false}))
)
