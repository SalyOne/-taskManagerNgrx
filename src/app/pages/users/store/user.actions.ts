import {createAction, props} from "@ngrx/store";

export const loadUsers = createAction(
  '[User] Load Users',
  props<{
    page: number,
    limit: number
  }>()
)


export const loadUsersSuccess = createAction(
  '[User] Load Success',
  props<{data:any}>()
)

export const loadUsersFailure = createAction(
  '[User] Load Success',
  props<{error:any}>()
)
