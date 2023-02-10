import { Component } from '@angular/core';
import {AuthService} from "../../../../core/services";
import {User} from "../../../../core/interfaces";
import {Observable} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
 userName! :string;
  constructor(
    private authService: AuthService,
    private userService: AuthService
  ) {
    this.getLoggedInUser()
  }

  getLoggedInUser(){
   this.userName =  this.userService.user?.firstName + " " + this.userService.user?.lastName
  }


  signOut(){
    this.authService.signOut()
  }
}
