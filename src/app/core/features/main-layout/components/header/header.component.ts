import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private authService: AuthService
  ){}

  signOut(){
    this.authService.signOut()
  }

}
