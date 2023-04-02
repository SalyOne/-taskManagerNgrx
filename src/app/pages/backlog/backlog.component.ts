import {Component, OnDestroy, OnInit} from '@angular/core';
import {DeletePopupComponent} from "../../shared/popups/delete-popup/delete-popup.component";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {ITask} from "../../core/interfaces/task";
import {of, Subject, switchMap, takeUntil} from "rxjs";
import {TaskService} from "../../core/services/task.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {TaskAddEditComponent} from "../../shared/task-add-edit/task-add-edit.component";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {Store} from "@ngrx/store";
import {BacklogStateModel, loadBacklogTasks} from "./store";

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent  implements OnInit, OnDestroy {
  displayedColumns = ['id', 'name', 'issueType', 'epic', 'createdAt', 'actions'];

  dataSource = new MatTableDataSource<ITask>();

  sub$ = new Subject();

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    private store: Store<{backlog: BacklogStateModel}>,
  ) {

  }


  ngOnInit(): void {
    this.store.select(state => state.backlog)
      .subscribe((backlog)=>{
        this.dataSource.data = backlog.tasks
      })

    this.store.dispatch(loadBacklogTasks())
  }
  loadBacklog() {
    this.store.dispatch(loadBacklogTasks())
  }


  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }

  deleteBoard(id: number) {
    const dialogRef = this.dialog.open(DeletePopupComponent);

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.sub$),
        switchMap((result) => {
          if (result) {
            return this.taskService.deleteTask(id);
          }
          return of(null);
        })
      )
      .subscribe(result => {
        if (result) {
          this.loadBacklog();
        }
      });
  }

  addTask(taskId?: number) {
    const  doalogRef = this.dialog.open(TaskAddEditComponent, {
      width: '1000px',
      data: {
        isBacklog: true,
        taskId,
      },
    });

    doalogRef.afterClosed().subscribe((task: ITask) => {
      if (task) {
        this.loadBacklog()
      }
    })
  }
}
