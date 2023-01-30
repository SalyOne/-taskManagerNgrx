import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/features/main-layout/main-layout.component';
import { AuthComponent } from './pages/Auth/auth.component';
import {HomeComponent} from "./pages/home/home.component";


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent,
  },

  {
    path: 'auth', component: AuthComponent
  },
  {
    path:'home',
    component: HomeComponent
    // loadChildren: ()=> import('./pages/home/home.module').then(m=> m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
