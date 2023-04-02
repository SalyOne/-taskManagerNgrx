import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {EIssueTypes} from "../../../../../../core/enums/issue-type";
import {IssueTypesService} from "../../../../../../core/services/issue-types.service";
import {of, Subject, switchMap, takeUntil, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DeletePopupComponent} from "../../../../../../shared/popups/delete-popup/delete-popup.component";
import {ProjectFacade} from "../../../../../../facades/project.facade";
import {Store} from "@ngrx/store";
import {
  createIssueType, getIssueType,
  getIssueTypes,
  IssueTypesStateModule,
  updateIssueType
} from "../../../../../../store/issue-types";
import {currentProject} from "../../../../../../store";
import {IIssueType} from "../../../../../../core/interfaces/issue-type";

@Component({
  selector: 'app-issue-types-add-edit',
  templateUrl: './issue-types-add-edit.component.html',
  styleUrls: ['./issue-types-add-edit.component.scss']
})
export class IssueTypesAddEditComponent  implements OnDestroy, OnInit{

  pageTitle: string =  "IssueType";
  editId!:number;
  projectID?: number
  sub$ = new Subject();
  form: FormGroup =  new FormGroup({
    id: new FormControl(null),
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    icon: new FormControl("", Validators.required),
    color: new FormControl("", Validators.required),
    isActive: new FormControl(true, Validators.required),
    type: new FormControl("", Validators.required),
    issueTypeColumns: new FormArray([], Validators.required),
  })
  issueTypes = Object.values(EIssueTypes);
  errorMsg?: string;
  constructor(
    // private issueService: IssueTypesService,
    // private projectFacade: ProjectFacade,
    private route: ActivatedRoute,
    // private router: Router,
    private dialog: MatDialog,
    private store:Store<{issueTypes: IssueTypesStateModule}>
  ) {
  }
  ngOnInit(): void {
    // this.projectID = this.projectFacade.getProject().id
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editId = +params['id'];
        this.getIssueType()
      }
    })
  }
  get issueFormArray(){
    return this.form.get("issueTypeColumns") as FormArray;
  }
  addColumn(){
    this.issueFormArray.push(new FormGroup({
      id: new FormControl(null),
      name: new FormControl("", Validators.required),
      filedName: new FormControl("", Validators.required),
      isRequired: new FormControl(false, Validators.required),
    }, Validators.required));
  }
  getIssueType(){
    this.store.select(getIssueType, {issueId: this.editId})
      .pipe(takeUntil(this.sub$))
      .subscribe((res:IIssueType| undefined)=>{
        if(!res) return

          this.form.patchValue(res)
          res.issueTypeColumns.forEach(column =>{
            this.issueFormArray.push(new FormGroup({
              id: new FormControl(column.id),
              name: new FormControl(column.name, Validators.required),
              filedName: new FormControl(column.filedName, Validators.required),
              isRequired: new FormControl(column.isRequired, Validators.required),
            }, Validators.required));
          })
      })
  }
  deleteIssue(i :number) {
    const  dialogRef = this.dialog.open(DeletePopupComponent);
    dialogRef.afterClosed()
      .pipe(takeUntil(this.sub$))
      .subscribe(res=>{
        if(res){
          this.issueFormArray.removeAt(i)
        }
      })
  }
  submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) return;
    if(this.editId){

      this.store.select(currentProject).pipe(
        takeUntil(this.sub$),
        tap((res)=>{
          this.store.dispatch(updateIssueType({issueTypes:this.form.value, projectId: res.id }))
        })
      ).subscribe()

      // this.issueService.editIssueType(this.form.value)
      //   .pipe(takeUntil(this.sub$))
      //   .subscribe({
      //       next: res =>{
      //         if (this.errorMsg){
      //           this.errorMsg = ""
      //         }
      //         this.router.navigate(['work/inner/', this.projectID,'types'])
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
          this.store.dispatch(createIssueType({issueTypes:this.form.value, projectId: res.id }))
        })
      ).subscribe()
      // this.issueService.addIssueType(this.form.value)
      //   .pipe(takeUntil(this.sub$))
      //   .subscribe({
      //       next: res =>{
      //         if (this.errorMsg){
      //           this.errorMsg = ""
      //         }
      //         this.router.navigate(['work/inner/', this.projectID,'types'])
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
