import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/features/main-layout/main-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children:[
      {
        path:'work',
        canActivate: [AuthGuard],
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
    canActivate: [LoginGuard],
    loadChildren: () =>import('./pages/Auth/auth.module').then(m=>m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
