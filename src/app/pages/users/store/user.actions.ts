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
  props<{users:any}>()
)

export const loadUsersFailure = createAction(
  '[User] Load Success',
  props<{error:any}>()
)

export const createUser = createAction(
  '[User] Create User',
  props<{user: any}>()
)

export const createUserSuccess = createAction(
  '[User] Create User Success',
  props<{ user: any}>()
)
export const createUserFailure = createAction(
  '[User] Create User Failure',
  props<{error: any}>()
)

export const updateUser = createAction(
  '[User] Update User',
  props<{user: any}>()
)
export const updateUserRoles = createAction(
  '[User] Update User Roles',
  props<{userId: number, roleIds: number[]}>()
)

export const deleteUser = createAction(
  '[User] Delete User',
  props<{ id: number }>()
);
