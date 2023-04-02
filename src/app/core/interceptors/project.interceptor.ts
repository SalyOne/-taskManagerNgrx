import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {first, map, Observable, switchMap} from 'rxjs';
import {ProjectFacade} from "../../facades/project.facade";
import {select, Store} from "@ngrx/store";
import {currentProject, ProjectStateModule} from "../../store/project";

@Injectable()
export class ProjectInterceptor implements HttpInterceptor {

  constructor(
    // private projectFacade : ProjectFacade,
    private store : Store<{project: ProjectStateModule}>,

  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return  this.store.pipe(
      select(currentProject),
      first(),
      switchMap((project)=>{
          if (project){
            request = request.clone({
              setHeaders:{
                'project': project.id.toString()
              }
            })
          }
          return next.handle(request)
      })
    )

    //
    // const project = this.projectFacade.getProject();
    //
    // if(project){
    //   return next.handle(request.clone({
    //     setHeaders:{'project': String(project.id)}
    //   }));
    // }
    // return next.handle(request)
  }
}
