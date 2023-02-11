import {Component, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {UsersService} from "../../../../core/services/users.service";
import {User} from "../../../../core/interfaces";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent   implements OnInit{
  sub$ = new Subject();
  users$: Observable<User[]> = this.usersService.getUsers();

  constructor(
    private usersService:UsersService
  ) {
    this.getUser()
  }

  ngOnInit(): void {
    this.getUser()
    }
  getUser(){
    return this.usersService.getUsers()
      .pipe(takeUntil(this.sub$))
      .subscribe(res =>{
        console.log(res, 'users list')
      })
  }
}
