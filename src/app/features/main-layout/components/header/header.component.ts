import {Component, OnInit} from '@angular/core';
import {AuthService, SidenavService} from 'src/app/core/services';
import {Store} from "@ngrx/store";
import {currentProject, initCurrentProject, loadProjects, ProjectStateModule} from "../../../../store/project";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private store : Store<{project: ProjectStateModule}>,

    private sidenavService : SidenavService,

  ){}
  toggleMenu(){
    this.sidenavService.toggleNav()
  }
  ngOnInit(): void {
      this.store.dispatch(loadProjects());
      this.store.dispatch(initCurrentProject())


  }

}
