import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, of, Subject, switchMap, takeUntil} from "rxjs";
import {WorkspaceService} from "../../../../core/services/workspace.service";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {IWorkspace} from "../../../../core/interfaces";
import {CookieService} from "ngx-cookie-service";
import {Store} from "@ngrx/store";
import {createProject, getProject, ProjectStateModule, updateProject} from "../../../../store/project";
import {update} from "lodash";

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

  projects$: Observable<IWorkspace[]> = this.workspaceService.getAllWorkspacesForUser()
  constructor(
    private store : Store<{project: ProjectStateModule}>,

    private workspaceService:WorkspaceService,
    private router: Router,
    private route: ActivatedRoute,
    private CS:CookieService
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: any) => {
        if (params['id']) {
          this.pageTitle = "edit workspace"
          return this.store.select(getProject, {projectId: +params['id']})
        }
        return of(null)
      })
    ).subscribe(res => {
      if (res) {
        this.form.patchValue(res)
      }
      return
    })

  }
  submit(){
    this.form.markAllAsTouched();
    if(this.form.invalid) return;

    if(this.form.value.id){
      this.store.dispatch(updateProject({project:this.form.value}))
        // .subscribe({
        //   next: res =>{
        //     if (this.errorMsg){
        //       this.errorMsg = ""
        //     }
        //     // console.log("ress: ", res)
        //     this.router.navigate(['/work/inner', this.form.value.id])
        //   },
        //   error: err=>{
        //     this.errorMsg = err.error.message;
        //   }
        // })
    }else{
      this.store.dispatch(createProject({project: this.form.value}))

      //   this.workspaceService.addWorkspace(this.form.value)
    //     .pipe(takeUntil(this.sub$))
    //     .subscribe({
    //         next: res =>{
    //           if (this.errorMsg){
    //             this.errorMsg = ""
    //           }
    //           // console.log("ress: ", res)
    //           this.ProjectID = res.id
    //           this.router.navigate(['/work/inner', res.id])
    //
    //           // console.log(this.ProjectID)
    //         },
    //         error: err=>{
    //           this.errorMsg = err.error.message;
    //         }
    //       }
    //     )
    }
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }

}
