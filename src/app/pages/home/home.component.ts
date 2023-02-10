import {Component, OnDestroy} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {IWorkspace} from "../../core/interfaces";
import {WorkspaceService} from "../../core/services/workspace.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy{
  getWorkspacesForMyUser$: Observable<IWorkspace[]> = this.workspaceService.getAllWorkspacesForUser();
  getWorkspacesForMyUser :IWorkspace[] = []

  sub$ = new Subject();
  firstLetter!: string;
  constructor(
    private workspaceService:WorkspaceService
  ) {
      this.getAllWorkspacesForUser()
  }

  getAllWorkspacesForUser(){
    return this.workspaceService.getAllWorkspacesForUser()
      .pipe(takeUntil(this.sub$))
      .subscribe(res =>{
      console.log(res)
    })
  }
  getFirstLetter(a:string){
    return a.charAt(0)
  }


  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }

}
