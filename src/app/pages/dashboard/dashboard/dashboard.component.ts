import { Component } from '@angular/core';
import { BoardService } from 'src/app/core/services/board.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private boardService: BoardService
  ) {
    
    
  }
  
  boards$ = this.boardService.getBoards()

  boardId: number | null = null

}
