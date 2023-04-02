import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil, tap} from "rxjs";
import {ProjectFacade} from "../../../../../../facades/project.facade";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {EpicService} from "../../../../../../core/services/epic.service";
import {Store} from "@ngrx/store";
import {createEpics, getEpic, IEpicStateModule, updateEpics} from "../../../../../../store/epics";
import {currentProject} from "../../../../../../store";

@Component({
  selector: 'app-epic-add-edit',
  templateUrl: './epic-add-edit.component.html',
  styleUrls: ['./epic-add-edit.component.scss']
})
export class EpicAddEditComponent   implements OnDestroy, OnInit {
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),

  })
  errorMsg?: string;
  editId!:number;
  projectID?: number
  sub$ = new Subject();
  constructor(
    private route: ActivatedRoute,
    private store: Store<{epics: IEpicStateModule}>
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editId = params['id'];
        this.getEpic(this.editId)
      }
    })
  }
   getEpic(id:number){
    return this.store.select(getEpic,{epicId:id})
      .pipe(takeUntil(this.sub$))
      .subscribe(res=>{
        if(!res) return
        this.form.patchValue(res)
      })
  }
  submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) return;

    if(this.editId){
      this.store.select(currentProject).pipe(
        takeUntil(this.sub$),
        tap((res)=>{
          this.store.dispatch(updateEpics({epics: this.form.value, projectId: res.id}))
        })
      ).subscribe()

      // this.epicService.editEpic(this.form.value)
      //   .pipe(takeUntil(this.sub$))
      //   .subscribe({
      //       next: res =>{
      //         if (this.errorMsg){
      //           this.errorMsg = ""
      //         }
      //       },
      //       error: err=>{
      //         this.errorMsg = err.error.message;
      //       }
      //     }
      //   )

    }else {
      this.store.select(currentProject).pipe(
        takeUntil(this.sub$),
        tap((res)=>{
          this.store.dispatch(createEpics({epics: this.form.value, projectId: res.id}))
        })
      ).subscribe()
      // this.epicService.addEpic(this.form.value)
      //   .pipe(takeUntil(this.sub$))
      //   .subscribe({
      //       next: res =>{
      //         if (this.errorMsg){
      //           this.errorMsg = ""
      //         }
      //         this.router.navigate(['work/inner/', this.projectID,'epics']).then()
      //       },
      //       error: err=>{
      //         this.errorMsg = err.error.message;
      //       }
      //     }
      //   )
    }
  }

  ngOnDestroy(): void {
    this.sub$.next(null)
    this.sub$.complete();
  }

}
