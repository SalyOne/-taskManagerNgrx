import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {IQueryTable, User} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {

  getUsers(): Observable<User[]> {
    return this.get<User[]>('users/all');
  }
  // getUsersAll(): Observable<any> {
  //   return this.get('users/all');
  // }
  getUsersAll(params:{

  }):Observable<IQueryTable<User>>{
    return  this.get<IQueryTable<User>>(`users/all`, params);
  }
}
