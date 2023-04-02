import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UsersService} from "../../../core/services/users.service";
import {
  createUser,
  createUserSuccess,
  deleteUser,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  updateUser, updateUserRoles
} from "./user.actions";
import {catchError, map, of, switchMap} from "rxjs";

@Injectable()
export class UserEffects{
  constructor(
    private actions$:Actions,
    private  userService: UsersService
  ) {
  }


  loadUsers$ =  createEffect(()=> this.actions$.pipe(
    ofType(loadUsers),
    switchMap((action)=> this.userService.getUsers({
      page:action.page || 1,
      limit: action.limit ||10,
    })),
    map((users)=> loadUsersSuccess({users})),
    catchError((error)=> of(loadUsersFailure({error})))
  ))
  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(updateUser),
    switchMap((action) => this.userService.updateUser(action.user)),
    map((data) => createUserSuccess({user: data})),
    map((data) => loadUsers({
      page: 1,
      limit: 10
    })),
    catchError((error) => of(loadUsersFailure({error})))
  ));
  createUser$ = createEffect(() => this.actions$.pipe(
    ofType(createUser),
    switchMap((action) => this.userService.createUser(action.user)),
    map((data) => createUserSuccess({user: data})),
    catchError((error) => of(loadUsersFailure({error})))
  ));

  deleteUser$ =  createEffect(()=> this.actions$.pipe(
    ofType(deleteUser),
    switchMap((action)=> this.userService.deleteUser(action.id)),
    map(()=> loadUsers({
      page:1,
      limit: 10
    })),
    catchError((error)=>of(loadUsersFailure({error})))
  ))
  updateUserRoles$ =  createEffect(()=> this.actions$.pipe(
    ofType(updateUserRoles),
    switchMap((action)=> this.userService.setRoles(action)),
    map(()=> loadUsers({
      page:1,
      limit: 10
    })),
    catchError((error)=>of(loadUsersFailure({error})))
  ))
}
