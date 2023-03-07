import {Component, OnDestroy} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {IWorkspace} from "../../core/interfaces";
import {WorkspaceService} from "../../core/services/workspace.service";
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {IBoard} from "../../core/interfaces/board";
import {BoardService} from "../../core/services/board.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy{
  // getWorkspacesForMyUser$: Observable<IWorkspace[]> = this.workspaceService.getAllWorkspacesForUser();
  getWorkspacesForMyUser :IWorkspace[] = []

  boards:IBoard[]= [];

  sub$ = new Subject();
  firstLetter!: string;
  loading: Boolean = false;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  constructor(
    private workspaceService:WorkspaceService,
    private boardService:BoardService,

  ) {
      this.getAllWorkspacesForUser()
  }

  getAllWorkspacesForUser(){
    this.loading  = true
    return this.workspaceService.getAllWorkspacesForUser()
      .pipe(takeUntil(this.sub$))
      .subscribe(res =>{
        console.log("workspaces",res)
        this.loading = false
        this.getWorkspacesForMyUser = res
    })
  }
  getFirstLetter(a:string){
    return a.charAt(0)
  }
  deleteProject(id?: number) {
    return this.workspaceService.deleteProject(String(id))
      .pipe(takeUntil(this.sub$)).subscribe(res=>{
        // console.log(res)
       this.getAllWorkspacesForUser()
      })
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }


  getBoardsFormWorkspace(id:number){
    console.log("workspace board",id)
    this.boardService.getBoardsWithHeader(id).subscribe(res=>{
      console.log(res)
      this.boards = res
    })
  }

  getBoards() {
    this.boardService.getBoards()
      .pipe(takeUntil(this.sub$))
      .subscribe(boards => {
        this.boards = boards;
      });
  }
}
