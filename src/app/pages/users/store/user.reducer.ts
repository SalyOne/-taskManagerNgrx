import {createReducer, on} from "@ngrx/store";
import {User} from "../../../core/interfaces";
import {loadUsers, loadUsersFailure, loadUsersSuccess} from "./user.actions";


export interface UserStateModel{
  users: User[];
  page: number,
  limit: number,
  totalCount: number,
  loading:boolean,
}

const  initialState = {
  users:[],
  page: 1,
  limit: 10,
  totalCount: 0,
  loading: false
}
export const  userReducer = createReducer(
  initialState,
  on(loadUsers, (state)=>{
    return{
      ...state,
      loading: true
    }
  }),
  on(loadUsersSuccess, (state, {users})=>{
    return{
      ...state,
      users:users.data,
      page: users.page,
      limit: users.limit,
      totalCount: users.totalCount,
      loading: false
    }
  }),
  on(loadUsersFailure, (state) => {
    return {
      ...state,
      loading: false
    }
  })
)
