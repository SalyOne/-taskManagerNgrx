import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {IQueryTable, IWorkspace} from "../interfaces/workspace.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService extends BaseService{
  // create new project/ workspace
  addWorkspace(param: IWorkspace):Observable<IWorkspace>{
    return this.post<IWorkspace>('project', param)
  }

  // get project/ workspace diffrent ways
  getAllWorkspacesForUser():Observable<IWorkspace[]>{
    return  this.get<IWorkspace[]>('project/my');
  }
  getAllWorkspaces():Observable<IWorkspace[]>{
    return  this.get<IWorkspace[]>('project/all');
  }
  getOneProject(id:any):Observable<IWorkspace>{
    return  this.get<IWorkspace>(`project/${id}`);
  }
  // get projects by specific parameters
  getProjectsByParams(params:{}):Observable<IQueryTable<IWorkspace>>{
    return  this.get<IQueryTable<IWorkspace>>(`project`, params);
  }

  // edit new project/ workspace
  editOneProject(id:string, editedProject:IWorkspace):Observable<IWorkspace>{
    return  this.put<IWorkspace>(`project/${id}`, editedProject);
  }

  // delete new project/ workspace
  deleteProject(id:any):Observable<IWorkspace>{
    return  this.delete<IWorkspace>(`project/${id}`);
  }


  //set users for a project
  addUsersToWorkspace(param: IWorkspace):Observable<IWorkspace>{
    return this.post<IWorkspace>('project', param)
  }
  getProjectUsers(): Observable<any> {
    return this.get(`project/users`);
  }
}
