import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {EpicService} from "../../core/services/epic.service";
import {Router} from "@angular/router";
import {createEpics, deleteEpics, loadEpics, loadEpicsFailure, loadEpicsSuccess, updateEpics} from "./epics.actions";
import {catchError, map, of, switchMap} from "rxjs";

@Injectable()
export class EpicsEffect{

  constructor(
    private actions$: Actions,
    private epicService: EpicService,
    private  router: Router
  ) {
  }

  loadEpics$ = createEffect(() => this.actions$.pipe(
    ofType(loadEpics),
    switchMap(()=> this.epicService.getAllEpics().pipe(
      map((data: any) => loadEpicsSuccess({epics:data})),
      catchError((error) => of(loadEpicsFailure({error})))
    ))
  ))


  createEpic$ = createEffect(() => this.actions$.pipe(
    ofType(createEpics),
    switchMap((action)=> this.epicService.addEpic(action.epics).pipe(
      map((data: any) =>{
        this.router.navigate(['work/inner/', action.projectId,'epics']).then()
        return loadEpics()
      }),
      catchError((error) => of(loadEpicsFailure({error})))
    ))
  ))
  updateEpic$ = createEffect(() => this.actions$.pipe(
    ofType(updateEpics),
    switchMap((action)=> this.epicService.editEpic(action.epics).pipe(
      map((data: any) =>{
        this.router.navigate(['work/inner/', action.projectId,'epics']).then()
        return loadEpics()
      }),
      catchError((error) => of(loadEpicsFailure({error})))
    ))
  ))
  deleteEpic$ = createEffect(() => this.actions$.pipe(
    ofType(deleteEpics),
    switchMap((action)=> this.epicService.deleteEpic(action.epicId).pipe(
      map((data: any) => loadEpics()),
      catchError((error) => of(loadEpicsFailure({error})))
    ))
  ))
}
