import { Component } from '@angular/core';
import { BoardService } from 'src/app/core/services/board.service';
import {ProjectFacade} from "../../../facades/project.facade";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private boardService: BoardService,
    private projectFacade: ProjectFacade
  ) {}

  boards$ = this.boardService.getBoards()

  boardId: number | null = null
  workspace$ = this.projectFacade.getProject()

}
