import {Component, OnDestroy, OnInit} from '@angular/core';

import {Observable, of, Subject, switchMap, takeUntil} from "rxjs";

import {DataSource} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import { BoardService } from 'src/app/core/services/board.service';
import { IBoard } from 'src/app/core/interfaces/board';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'name', 'createdAt', 'actions'];

  dataSource = new MatTableDataSource<IBoard>();

  sub$ = new Subject();

  constructor(
    private boardService: BoardService,
    public dialog: MatDialog,
  ) {

  }


  ngOnInit(): void {
    this.getBoards();
  }

  getBoards() {
    this.boardService.getBoards()
      .pipe(takeUntil(this.sub$))
      .subscribe(boards => {
        this.dataSource.data = boards;
      });
  }

  addBoard() {
    console.log('add boards');
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }

  // deleteBoard(id: number) {
  //   const dialogRef = this.dialog.open(ConfirmationPopupComponent);

  //   dialogRef.afterClosed()
  //     .pipe(
  //       takeUntil(this.sub$),
  //       switchMap((result) => {
  //         if (result) {
  //           return this.boardService.deleteBoard(id);
  //         }
  //         return of(null);
  //       })
  //     )
  //     .subscribe(result => {
  //       if (result) {
  //         this.getBoards();
  //       }
  //     });
  // }
}