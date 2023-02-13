import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {IWorkspace} from "../interfaces/workspace.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService extends BaseService{

  addWorkspace(param: IWorkspace):Observable<IWorkspace>{
    return this.post<IWorkspace>('project', param)
  }
  getAllWorkspacesForUser():Observable<IWorkspace[]>{
    return  this.get<IWorkspace[]>('project/my');
  }
  getAllWorkspaces():Observable<IWorkspace[]>{
    return  this.get<IWorkspace[]>('project/all');
  }
  getOneProject(id:any):Observable<IWorkspace>{
    return  this.get<IWorkspace>(`project/${id}`);
  }
  editOneProject(id:string, editedProject:IWorkspace):Observable<IWorkspace>{
    return  this.put<IWorkspace>(`project/${id}`, editedProject);
  }
  deleteProject(id:any):Observable<IWorkspace>{
    return  this.delete<IWorkspace>(`project/${id}`);
  }
}
