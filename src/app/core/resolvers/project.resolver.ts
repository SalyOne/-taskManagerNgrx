import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {map, Observable, of} from 'rxjs';
import {WorkspaceService} from "../services";
import {ProjectFacade} from "../../facades/project.facade";
import {ProjectStateModule, setProjects} from "../../store/project";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class ProjectResolver implements Resolve<boolean> {
  constructor(
    private workspaceService: WorkspaceService,
    private projectFacade: ProjectFacade,
    private  store: Store<{project: ProjectStateModule}>
  ) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const projectId: number = route.params['projectId']


    this.store.dispatch(setProjects({projectId}))
    return this.workspaceService.getOneProject(projectId)
      .pipe(
        map(res=>{
          return true
        })
      );
  }
}
