import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/features/main-layout/main-layout.component';

import {HomeComponent} from "./pages/home/home.component";
import {WorkspaceComponent} from "./pages/workspace/workspace.component";


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children:[
      {
        path:'work',
        loadChildren: ()=> import('./pages/workspace/workspace.module').then(m=> m.WorkspaceModule)
      },
      {
        path:'home',
        loadChildren: ()=> import('./pages/home/home.module').then(m=> m.HomeModule)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () =>import('./pages/Auth/auth.module').then(m=>m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
