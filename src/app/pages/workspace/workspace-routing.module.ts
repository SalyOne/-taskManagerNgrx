import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorkspaceComponent} from "./workspace.component";
import {CreateEditWorkspaceComponent} from "./components/create-edit-workspace/create-edit-workspace.component";

const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent
  },
  {
    path:'add',
    component: CreateEditWorkspaceComponent
  },
  {
    path:'edit/:id',
    component: CreateEditWorkspaceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
