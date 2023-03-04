import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InfoComponent} from "./info/info.component";
import {InnerWorkspaceComponent} from "./inner-workspace.component";
import {ProjectBoardComponent} from "./board/project-board/project-board.component";
import {BoardAddEditComponent} from "./board/board-add-edit/board-add-edit.component";

const routes: Routes = [
  {
    path:':id',
    component:InnerWorkspaceComponent,
    children:[
      {
        path:'',
        component:InfoComponent,
      },
      {
        path: 'board',
        children: [
          {
            path: '',
            component: ProjectBoardComponent
          },
          {
            path: 'add',
            component: BoardAddEditComponent
          },
          {
            path:'edit/:id',
            component: BoardAddEditComponent
          },

        ]
      },
    ]
  }

];
// {
//   path:'',
//     component:InnerWorkspaceComponent,
//   children:[
//   {
//     path: ':id/info',
//     component:InfoComponent,
//     pathMatch: 'full'}
// ]
// }
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InnerWorkspaceRoutingModule { }
