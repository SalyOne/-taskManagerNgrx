import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {IssueTypesService} from "../../core/services/issue-types.service";
import {
  createIssueType, deleteIssueType,
  loadIssueTypes,
  loadIssueTypesFailure,
  loadIssueTypesSuccess,
  updateIssueType
} from "./issue-types.actions";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {IIssueType} from "../../core/interfaces/issue-type";
import {Router} from "@angular/router";

@Injectable()
export class IssueTypesEffects{


  constructor(
    private actions$: Actions,
    private router: Router,
    private  readonly  issueTypesService: IssueTypesService
  ) {}

  loadIssueTypes$ = createEffect(() => this.actions$.pipe(
      ofType(loadIssueTypes),
      switchMap(() => this.issueTypesService.getAllIssueTypes().pipe(
          tap((data: IIssueType[]) => console.log(data)),
          map((data: any) => loadIssueTypesSuccess({issueTypes: data})),
          catchError((error) => of(loadIssueTypesFailure({error})))
        )
      )
    )
  );
  createIssueTypes$ = createEffect(() => this.actions$.pipe(
      ofType(createIssueType),
      switchMap((action) => this.issueTypesService.addIssueType(action.issueTypes).pipe(
          map((data: any) =>{
            this.router.navigate(['work/inner/', data.projectId,'types'])
           return loadIssueTypes()
          } ),
          catchError((error) => of(loadIssueTypesFailure({error})))
        )
      )
    )
  );
  updateIssueTypes$ = createEffect(() => this.actions$.pipe(
      ofType(updateIssueType),
      switchMap((action) => this.issueTypesService.editIssueType(action.issueTypes).pipe(
          map((data: any) =>{
            this.router.navigate(['work/inner/', data.projectId,'types'])
            return loadIssueTypes()
          } ),
          catchError((error) => of(loadIssueTypesFailure({error})))
        )
      )
    )
  );


  deleteIssueTypes$ = createEffect(() => this.actions$.pipe(
      ofType(deleteIssueType),
      switchMap((action) => this.issueTypesService.deleteIssueType(action.issueId).pipe(
          map((data: any) => loadIssueTypes()),
          catchError((error) => of(loadIssueTypesFailure({error})))
        )
      )
    )
  );

}
