import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {WorkspaceService} from "../../core/services";
import {
  loadProjects,
  loadProjectsFailure,
  loadProjectsSuccess
} from "./project.actions";
import {catchError, map, of, switchMap} from "rxjs";
import {Store} from "@ngrx/store";

@Injectable()
export class ProjectEffect{
  constructor(
    private actions$: Actions,
    private workspaceService: WorkspaceService,
    private store: Store,
  ) {}

  loadProjects$ =  createEffect(()=>this.actions$.pipe(
    ofType(loadProjects),
    switchMap(()=> this.workspaceService.getProjectBoards().pipe(
      map((data)=>loadProjectsSuccess({data})),
      catchError((error)=>of(loadProjectsFailure({error})))
    ))
  ))
  //
  // setProjects$ =  createEffect(()=>this.actions$.pipe(
  //   ofType(setProjects),
  //   switchMap((action)=> this.workspaceService.getOneProject(action.projectId).pipe(
  //     map((data)=>setProjectsSuccess({data})),
  //     catchError((error)=>of(setProjectsFailure({error})))
  //   ))
  // ))
  //
  //
  // setProjectsSuccess$ =  createEffect(()=>this.actions$.pipe(
  //   ofType(setProjectsSuccess),
  //   map((action)=> {
  //     localStorage.setItem('project',JSON.stringify(action.data))
  //   })
  // ),{dispatch:false })
}
