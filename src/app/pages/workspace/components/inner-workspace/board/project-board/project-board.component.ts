import {AfterViewInit, Component, OnDestroy, OnInit, ChangeDetectorRef} from '@angular/core';

import {Observable, of, Subject, switchMap, takeUntil, tap} from "rxjs";

import {DataSource} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import { BoardService } from 'src/app/core/services/board.service';
import { IBoard } from 'src/app/core/interfaces/board';
import { DeletePopupComponent } from 'src/app/shared/popups/delete-popup/delete-popup.component';
import {Store} from "@ngrx/store";
import {currentProject, ProjectStateModule} from "../../../../../../store/project";
import {BoardStateModule, deleteBoard, getBoards, loadBoards} from "../../../../../../store";

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns = ['id', 'name', 'createdAt', 'actions'];

  dataSource = new MatTableDataSource<IBoard>();

  sub$ = new Subject();

  isLoading = false;

  totalData?: number;
  pageSizes = [5,10,20];

  constructor(
    private boardService: BoardService,
    private store : Store<{project: ProjectStateModule, board: BoardStateModule}>,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {

  }


  ngOnInit(): void {
    // this.getBoards()
    this.store.select(currentProject)
      .pipe()
      .subscribe((proj)=>{
        if (proj){
          this.store.dispatch(loadBoards())
        }
      }
    )
  }
  ngAfterViewInit(): void {
    this.isLoading = true
    this.getBoards()
    this.cd.detectChanges()
  }
  getBoards() {
    this.store.select(getBoards)
      .pipe(takeUntil(this.sub$))
      .subscribe(boards => {
        this.dataSource.data = boards;
        this.isLoading =false
      });
  }

  deleteBoard(id: number) {
    const dialogRef = this.dialog.open(DeletePopupComponent);

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.sub$),
        tap((result) => {
          if (result) {
            return this.store.dispatch(deleteBoard({boardId: id}))
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }



}
