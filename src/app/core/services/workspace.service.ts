import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {IWorkspace, IWorkspaceTable} from "../interfaces/workspace.interface";
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

  getProjectsByParams(params:{
    page?:number,
    limit?:number,
    totalCount?:number,
  }):Observable<IWorkspaceTable>{
    return  this.get<IWorkspaceTable>(`project`, params);
  }

  // edit new project/ workspace
  editOneProject(id:string, editedProject:IWorkspace):Observable<IWorkspace>{
    return  this.put<IWorkspace>(`project/${id}`, editedProject);
  }

  // delete new project/ workspace
  deleteProject(id:any):Observable<IWorkspace>{
    return  this.delete<IWorkspace>(`project/${id}`);
  }
}
