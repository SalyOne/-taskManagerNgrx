import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorkspaceComponent} from "./workspace.component";
import {CreateWorkspaceComponent} from "./components/create-workspace/create-workspace.component";
import { BoardComponent } from './components/board/board.component';

const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent
  },
  {
    path:'add',
    component: CreateWorkspaceComponent
  },
  {
    path:'board',
    component: BoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
