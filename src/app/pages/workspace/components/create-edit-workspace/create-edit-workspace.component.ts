import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {of, Subject, switchMap, takeUntil} from "rxjs";
import {WorkspaceService} from "../../../../core/services/workspace.service";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-create-workspace',
  templateUrl: './create-edit-workspace.component.html',
  styleUrls: ['./create-edit-workspace.component.scss']
})
export class CreateEditWorkspaceComponent implements OnDestroy , OnInit{
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
      name : new FormControl('', [Validators.required]),
      abbreviation : new FormControl('', [Validators.required]),
      description : new FormControl('',[Validators.required]),
      color : new FormControl('',[Validators.required]),
    }
  );
  sub$ = new Subject();
  errorMsg? : string
  pageTitle:string = "create workspace"

  constructor(
    private workspaceService:WorkspaceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: any) => {
        if (params['id']) {
          this.pageTitle = "edit workspace"
          return this.workspaceService.getOneProject(params['id'])
        }
        return of(null)
      })
    ).subscribe(res => {
      if (res) {
        this.form.patchValue(res)
      }
    })

  }

  submit(){
    this.form.markAllAsTouched();
    if(this.form.invalid) return;

    // console.log(this.form.value)

    if(this.form.value.id){
      this.workspaceService.editOneProject(this.form.value.id ,this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe({
          next: res =>{
            if (this.errorMsg){
              this.errorMsg = ""
            }
            // console.log("ress: ", res)
            this.router.navigate(['/home'])
          },
          error: err=>{
            this.errorMsg = err.error.message;
          }
        })
    }else{
      this.workspaceService.addWorkspace(this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe({
            next: res =>{
              if (this.errorMsg){
                this.errorMsg = ""
              }
              // console.log("ress: ", res)
              this.router.navigate(['/home'])
            },
            error: err=>{
              this.errorMsg = err.error.message;
            }
          }
        )
    }
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }

}
