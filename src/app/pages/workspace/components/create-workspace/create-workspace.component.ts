import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {WorkspaceService} from "../../../../core/services/workspace.service";

@Component({
  selector: 'app-create-workspace',
  templateUrl: './create-workspace.component.html',
  styleUrls: ['./create-workspace.component.scss']
})
export class CreateWorkspaceComponent implements OnDestroy{
  form: FormGroup = new FormGroup({
      name : new FormControl('', [Validators.required]),
      abbreviation : new FormControl('', [Validators.required]),
      description : new FormControl('',[Validators.required]),
      color : new FormControl('',[Validators.required]),
    }
  );
  sub$ = new Subject();
  errorMsg? : string


  constructor(
    private workspaceService:WorkspaceService
  ) {
  }
  submit(){
    this.form.markAllAsTouched();
    if(this.form.invalid) return;
    console.log(this.form.value)
    this.workspaceService.addWorkspace(this.form.value)
      .pipe(takeUntil(this.sub$))
      .subscribe({
          next: res =>{
            if (this.errorMsg){
              this.errorMsg = ""
            }
            console.log("ress: ", res)
          },
          error: err=>{
            this.errorMsg = err.error.message;
            console.log("error: ", err)
            console.log("error: ", err.error.message)
            console.log("error: ", err.message)
          }
        }
      )
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }

}
