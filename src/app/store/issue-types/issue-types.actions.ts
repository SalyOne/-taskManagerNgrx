import {createAction, props} from "@ngrx/store";

export const loadIssueTypes = createAction(
  '[IssueType] Load IssueTypes'
)

export const loadIssueTypesSuccess = createAction(
  '[IssueType] Load IssueTypes Success',
  (issueTypes: any) => issueTypes
)
export const loadIssueTypesFailure = createAction(
  '[IssueType] Load IssueTypes Failure',
  (error:any) =>error
)

export const createIssueType= createAction(
  '[IssueType] Create IssueTypes',
  props<{issueTypes: any, projectId: number}>(),
)
export const updateIssueType = createAction(
  '[IssueType] Update IssueTypes ',
  props<{issueTypes: any, projectId: number}>(),
  // (issueTypes: any, projectId: number) => {return { issueTypes ,  projectId} }
)
export const deleteIssueType = createAction(
  '[IssueType] delete IssueTypes ',
  props<{issueId: number}>(),
)
