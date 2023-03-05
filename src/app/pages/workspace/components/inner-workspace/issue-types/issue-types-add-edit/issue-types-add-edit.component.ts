import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {EIssueTypes} from "../../../../../../core/enums/issue-type";
import {IssueTypesService} from "../../../../../../core/services/issue-types.service";
import {of, Subject, switchMap, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DeletePopupComponent} from "../../../../../../shared/popups/delete-popup/delete-popup.component";

@Component({
  selector: 'app-issue-types-add-edit',
  templateUrl: './issue-types-add-edit.component.html',
  styleUrls: ['./issue-types-add-edit.component.scss']
})
export class IssueTypesAddEditComponent  implements OnDestroy, OnInit{

  pageTitle: string =  "IssueType";
  editId!:string;
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
    private issueService: IssueTypesService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
  }
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editId = params['id'];
        // this.getBoard()
      }
    })
  }
  get issueFormArray(){
    return this.form.get("issueTypeColumns") as FormArray;
  }
  addColumn(){
    this.issueFormArray.push(new FormGroup({
      name: new FormControl("", Validators.required),
      filedName: new FormControl("", Validators.required),
      isRequired: new FormControl(false, Validators.required),
    }, Validators.required));
  }
  submit() {
    this.form.markAllAsTouched()
    console.log("in issue submit")
    if (this.form.invalid) return;
    if(this.editId){
      this.issueService.editIssueType(this.editId, this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe({
            next: res =>{
              if (this.errorMsg){
                this.errorMsg = ""
              }
              console.log("responce: ", res)
              // this.router.navigate(['/home'])
            },
            error: err=>{
              this.errorMsg = err.error.message;
            }
          }
        )

    }else {
      this.issueService.addIssueType(this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe({
            next: res =>{
              if (this.errorMsg){
                this.errorMsg = ""
              }
              console.log("responce: ", res)
              // this.router.navigate(['/home'])
            },
            error: err=>{
              this.errorMsg = err.error.message;
            }
          }
        )
    }
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
  ngOnDestroy(): void {
    this.sub$.next(null)
    this.sub$.complete();
  }

}
