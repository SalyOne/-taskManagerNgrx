import {Component, OnDestroy} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {IWorkspace} from "../../core/interfaces";
import {WorkspaceService} from "../../core/services/workspace.service";
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy{
  // getWorkspacesForMyUser$: Observable<IWorkspace[]> = this.workspaceService.getAllWorkspacesForUser();
  getWorkspacesForMyUser :IWorkspace[] = []

  sub$ = new Subject();
  firstLetter!: string;
  loading: Boolean = false;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  constructor(
    private workspaceService:WorkspaceService
  ) {
      this.getAllWorkspacesForUser()
  }

  getAllWorkspacesForUser(){
    this.loading  = true
    return this.workspaceService.getAllWorkspacesForUser()
      .pipe(takeUntil(this.sub$))
      .subscribe(res =>{
        console.log(res)
        this.loading = false
        this.getWorkspacesForMyUser = res
    })
  }
  getFirstLetter(a:string){
    return a.charAt(0)
  }

  deleteProject(id?: number) {
    return this.workspaceService.deleteProject(String(id))
      .pipe(takeUntil(this.sub$)).subscribe(res=>{
        console.log(res)
       this.getAllWorkspacesForUser()
      })
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }

}
