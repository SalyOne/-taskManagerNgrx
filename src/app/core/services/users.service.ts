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
  getUser(id: number): Observable<User> {
    return this.get(`users/${id}`);
  }
  getUsersAll(params: {}): Observable<IQueryTable<User>> {
    return this.get<IQueryTable<User>>(`users/all`, params);
  }

  create(data: any) {
    return this.post('users', data);
  }
  setRoles(params: { userId: number, roleIds: number[] }): Observable<User> {
    return this.post(`users/roles`, params);
  }
  // create(data: any): Observable<User> {
  //   return this.post<User>('users', data);
  // }
  // create(params:{}): Observable<User> {
  //   return this.post<IQueryTable<User>>(`procedures`, params);
  // }

  deleteUser(id: any): Observable<User> {
    return this.delete<User>(`users/${id}`);
  }
}
