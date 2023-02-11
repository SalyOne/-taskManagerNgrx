import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {User} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {

  getUsers(): Observable<User[]> {
    return this.get<User[]>('users');
  }
}
