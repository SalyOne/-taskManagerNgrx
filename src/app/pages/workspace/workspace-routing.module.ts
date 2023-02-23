import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorkspaceComponent} from "./workspace.component";
import {CreateEditWorkspaceComponent} from "./components/create-edit-workspace/create-edit-workspace.component";

import {InnerWorkspaceComponent} from "./components/inner-workspace/inner-workspace.component";
import {WorkspaceListComponent} from "./components/workspace-list/workspace-list.component";
import { BoardAddEditComponent } from './components/board-add-edit/board-add-edit.component';
import { ProjectBoardComponent } from './components/project-board/project-board.component';

const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent
  },
  {
    path: 'list',
    component: WorkspaceListComponent
  },
  {
    path:'add',
    component: CreateEditWorkspaceComponent
  },
  {
    path: 'boards',
    children: [
      {
        path: '',
        component: ProjectBoardComponent
      },
      {
        path: 'add',
        component: BoardAddEditComponent
      },
    
    ]
  },
  
  {
    path:'edit/:id',
    component: CreateEditWorkspaceComponent
  },
  {
    path: ':id',
    component: InnerWorkspaceComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
