import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import { ETaskStatus } from 'src/app/core/enums/task-status.enum';
import { BoardService } from 'src/app/core/services/board.service';
import { IWorkspace } from 'src/app/core/interfaces';
import { ProjectFacade } from 'src/app/facades/project.facade';
import {Store} from "@ngrx/store";
import {createBoard, currentProject, getBoard, updateBoard} from "../../../../../../store";
import {map, Observable, Subject, takeUntil, tap} from "rxjs";
import {IBoard} from "../../../../../../core/interfaces/board";

@Component({
  selector: 'app-board-add-edit',
  templateUrl: './board-add-edit.component.html',
  styleUrls: ['./board-add-edit.component.scss']
})
export class BoardAddEditComponent implements OnInit , OnDestroy{

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    position: new FormControl(1, Validators.required),
    description: new FormControl(null, Validators.required),
    columns: new FormArray([], Validators.required),
  })
  taskStatuses = Object.values(ETaskStatus);
  sub$ = new Subject();
  boardId!: number;
  workspaceId!: number;

  get columnsFormArray() {
    return this.form.get('columns') as FormArray;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.boardId = +params['id'];
        this.getBoard()
      }
    })
    // console.log(this.workspace)

  }

  getBoard() {

    this.store.select(getBoard,{boardId: this.boardId}).subscribe((res: IBoard | undefined) => {

      if(!res){ return }
      this.form.patchValue(res)
      res.columns.forEach(column => {
        this.columnsFormArray.push(new FormGroup({
          id: new FormControl(column.id),
          name: new FormControl(column.name, Validators.required),
          description: new FormControl(column.description, Validators.required),
          position: new FormControl(column.position, Validators.required),
          taskStatus: new FormControl(column.taskStatus, Validators.required)
        }, Validators.required));
      })
    })
  }

  addColumn() {
    this.columnsFormArray.push(new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      position: new FormControl(this.columnsFormArray.length + 1, Validators.required),
      taskStatus: new FormControl(ETaskStatus.ToDo, Validators.required)
    }, Validators.required));
  }

  deleteColumn(i: number){
    this.columnsFormArray.removeAt(i)
  }



  save() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      return;
    }

    if (this.boardId) {

      this.store.select(currentProject)
        .pipe(
          tap((res)=> {
            this.store.dispatch(updateBoard({board: this.form.value , projectId: res.id} ))
          }),
          takeUntil(this.sub$)
        ).subscribe()


    } else {
      this.store.select(currentProject)
        .pipe(
          tap((res)=> {
            this.store.dispatch(createBoard ({board: this.form.value , projectId: this.workspaceId} ))
          }),
          takeUntil(this.sub$)
        ).subscribe()
    }
  }

  drop(event: CdkDragDrop<any, any>) {
    moveItemInArray(this.columnsFormArray.controls, event.previousIndex, event.currentIndex);
    // console.log(this.columnsFormArray.controls)
    this.columnsFormArray.controls.forEach((control, index) => {
      control.get('position')?.setValue(index + 1)
    })
  }


  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }
}
