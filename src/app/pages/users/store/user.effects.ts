import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UsersService} from "../../../core/services/users.service";
import {loadUsers, loadUsersFailure, loadUsersSuccess} from "./user.actions";
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
    switchMap(()=> this.userService.getUsers({
      page:1,
      limit: 10,
    })),
    map((data)=> loadUsersSuccess({data})),
    catchError((error)=> of(loadUsersFailure({error})))
  ))

}
