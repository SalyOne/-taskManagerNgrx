import {createSelector} from "@ngrx/store";
import {IBoard} from "../../core/interfaces/board";
import {IIssueType} from "../../core/interfaces/issue-type";

export const getIssueTypes =  createSelector(
  (state:any) =>state.app.issueType.issueTypes,
  (issueTypes) => issueTypes
)

export const getIssueType =  createSelector(
  (state:any) =>state.app.issueType.issueTypes,
  (issueTypes:IIssueType[], props:{issueId: number}) => issueTypes.find((each)=>each.id === +props.issueId)
)
