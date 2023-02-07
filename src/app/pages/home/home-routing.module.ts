import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home.component";
import {CreateWorkspaceComponent} from "../workspace/components/create-workspace/create-workspace.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'add',
    component: CreateWorkspaceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
