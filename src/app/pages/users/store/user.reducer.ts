import {createReducer, on} from "@ngrx/store";
import {User} from "../../../core/interfaces";
import {loadUsersSuccess} from "./user.actions";


export interface UserStateModel{
  users: User[];
  page: number,
  limit: number,
  totalCount: number,
}

const  initialState = {
  users:[]
}
export const  userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, {data})=>{
    return{
      ...state,
      users:data.data,
      page: data.page,
      limit: data.limit,
      totalCount: data.totalCount,
    }
  })
)
