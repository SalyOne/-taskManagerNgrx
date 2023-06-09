import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {BoardService} from "../../core/services/board.service";
import {createBoard, deleteBoard, loadBoards, loadBoardsFailure, loadBoardsSuccess, updateBoard} from "./board.actions";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class BoardEffects{
  constructor(
    private actions$: Actions,
    private  boardService: BoardService,
    private router :Router,
  ) {}

  loadBoards$ =  createEffect(() =>this.actions$.pipe(
    ofType(loadBoards),
    switchMap(()=>this.boardService.getBoards().pipe(
      map((data)=> loadBoardsSuccess({data})),
      catchError((error)=> of(loadBoardsFailure({error})))
    ))
  ))

  deleteBoard$ = createEffect(()=> this.actions$.pipe(
    ofType(deleteBoard),
    switchMap((action) => this.boardService.deleteBoard(action.boardId).pipe(
      map(()=> loadBoards()),
      catchError((error)=> of(loadBoardsFailure({error})))
    ))
  ))
  createBoard$ = createEffect(()=> this.actions$.pipe(
    ofType(createBoard),
    switchMap((action) => this.boardService.createBoard(action.board).pipe(
      map((res)=> {
        this.router.navigate(['/work/inner', res.projectId, 'board']).then()
        return loadBoards()
      }),
      catchError((error)=> of(loadBoardsFailure({error})))
    ))
  ))

  updateBoard$ = createEffect(()=> this.actions$.pipe(
    ofType(updateBoard),
    switchMap((action) => this.boardService.updateBoard(action.board).pipe(
      map((res)=> {
        this.router.navigate(['/work/inner', res.projectId, 'board']).then()
        return loadBoards()
      }),
      catchError((error)=> of(loadBoardsFailure({error})))
    ))
  ))
}
