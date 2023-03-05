import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './features/main-layout/main-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import { HomeComponent } from './pages/home/home.component';
import {PagenotfoundComponent} from "./pages/pagenotfound/pagenotfound.component";


const routes: Routes = [
  {
    path: 'auth',
    canActivate: [LoginGuard],
    loadChildren: () => import('./pages/Auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'

      },
      {
        path: 'work',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/workspace/workspace.module').then(m => m.WorkspaceModule)
      },
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
      },
      //es yoveltvis boloshi unda eweros
      // { path: '**',
      //   pathMatch:"full",
      //   component: PagenotfoundComponent
      // },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
