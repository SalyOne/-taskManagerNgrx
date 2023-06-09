

import {Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {IEpic} from "../interfaces/epic";

@Injectable({
  providedIn: 'root'
})
export class EpicService  extends  BaseService{


  addEpic(param: IEpic):Observable<IEpic>{
    return this.post<IEpic>('epics', param)
  }

  editEpic(editedProject:IEpic):Observable<IEpic>{
    return  this.put<IEpic>(`epics/${editedProject.id}`, editedProject);
  }

  getAllEpics() :Observable<IEpic[]>{
    return this.get<IEpic[]>(`epics`)
  }
  getEpic(id:string) :Observable<IEpic>{
    return this.get<IEpic>(`epics/${id}`)
  }

  deleteEpic(id:number){
    return this.delete(`epics/${id}`);
  }
}
