import { Component } from '@angular/core';
import {AuthService, SidenavService} from 'src/app/core/services';
import { BoardService } from 'src/app/core/services/board.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private authService: AuthService,
    private sidenavService : SidenavService,
    private boardService: BoardService
  ){}

  signOut(){
    this.authService.signOut()
  }
  toggleMenu(){
    this.sidenavService.toggleNav()
  }
  boards$ = this.boardService.getBoards()
}
