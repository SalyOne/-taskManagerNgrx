import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {IIssueType} from "../interfaces/issue-type";

@Injectable({
  providedIn: 'root'
})
export class IssueTypesService  extends BaseService{


  addIssueType(param: IIssueType):Observable<IIssueType>{
    return this.post<IIssueType>('issue-type', param)
  }

  editIssueType(id:string, editedProject:IIssueType):Observable<IIssueType>{
    return  this.put<IIssueType>(`issue-type/${id}`, editedProject);
  }
}
