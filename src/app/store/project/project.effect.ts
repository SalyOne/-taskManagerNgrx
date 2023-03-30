import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {WorkspaceService} from "../../core/services";
import {
  createProject,
  loadProjects,
  loadProjectsFailure,
  loadProjectsSuccess, setProjects, updateProject
} from "./project.actions";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {IWorkspace} from "../../core/interfaces";
import {Router} from "@angular/router";

@Injectable()
export class ProjectEffect{
  constructor(
    private actions$: Actions,
    private workspaceService: WorkspaceService,
    private router: Router,
    private store: Store,
  ) {}

  loadProjects$ =  createEffect(()=>this.actions$.pipe(
    ofType(loadProjects) ,
    switchMap(()=> this.workspaceService.getProjectBoards().pipe(
      map((data)=>loadProjectsSuccess({data})),
      catchError((error)=>of(loadProjectsFailure({error})))
    ))
  ))

  createProject$ =  createEffect(()=>this.actions$.pipe(
    ofType(createProject) ,
    switchMap((action)=> this.workspaceService.addWorkspace(action.project).pipe(
      tap((res:IWorkspace)=>{ loadProjects()}),
      tap((res:IWorkspace)=>{ if(res.id){ setProjects({projectId: res.id})}}),
      map((data)=>{
        this.router.navigate(['/work/inner', data.id])
        return loadProjects()
      }),
      catchError((error)=>of(loadProjectsFailure({error})))
    ))
  ))
 updateProject$ =  createEffect(()=>this.actions$.pipe(
    ofType(updateProject) ,
    switchMap((action)=> this.workspaceService.editOneProject(action.project).pipe(
      tap((res:IWorkspace)=>{ loadProjects()}),
      tap((res:IWorkspace)=>{ if(res.id){ setProjects({projectId: res.id})}}),
      map((data)=>{
        this.router.navigate(['/work/inner', data.id])

        return loadProjects()
      }),
      catchError((error)=>of(loadProjectsFailure({error})))
    ))
  ))

  // initCurrentProject$ =  createEffect(()=> this.actions$.pipe(
  //   ofType(setProjects),
  //
  // ))
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
