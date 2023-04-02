import {createSelector} from "@ngrx/store";
import {User} from "../../../core/interfaces";

export const getUsers = createSelector(
  (state: any) => state.user.users,
  (users: User[]) => users
)

export const userTotal = createSelector(
  (state: any) => state.user.totalCount,
  (total: number) => total
);

export const getUserById = (id: number) => createSelector(
  (state: any) => state.user.users,
  (users: User[]) => users.find(user => user.id === id)
);

export const isLoading = createSelector(
  (state: any) => state.user.loading,
  (loading) => loading
)
