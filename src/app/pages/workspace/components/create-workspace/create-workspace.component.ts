import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {WorkspaceService} from "../../../../core/services/workspace.service";
import {Router, RouterModule} from "@angular/router";

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
    private workspaceService:WorkspaceService,
    private router: Router
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

            this.router.navigate(['/home'])
          },
          error: err=>{
            this.errorMsg = err.error.message;
          }
        }
      )
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }

}
