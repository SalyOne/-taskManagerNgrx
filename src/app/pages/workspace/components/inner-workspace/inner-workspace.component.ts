import {Component, OnInit} from '@angular/core';
import {IWorkspace} from "../../../../core/interfaces";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {
  currentProject,
  initCurrentProject,
  loadProjects,
  ProjectStateModule,
  setProjects
} from "../../../../store/project";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-inner-workspace',
  templateUrl: './inner-workspace.component.html',
  styleUrls: ['./inner-workspace.component.scss']
})

export class InnerWorkspaceComponent implements  OnInit{
  workspace$: Observable<IWorkspace> | null = this.store.select(currentProject);
  loading: boolean = true;

  constructor(
    private route : ActivatedRoute,
    private store: Store<{project : ProjectStateModule}>
  ) {}

  selectProject(projectId: any) {
    this.store.dispatch(setProjects({projectId}))
    this.loading = false;
  }
  ngOnInit(): void {

    this.route.params.subscribe(params =>{
      this.selectProject(params['id']);
      this.store.dispatch(initCurrentProject());
    })
  }
}

