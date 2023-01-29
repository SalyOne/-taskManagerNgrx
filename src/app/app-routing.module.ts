import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/features/main-layout/main-layout.component';



const routes: Routes = [
  {
    path: '', component: MainLayoutComponent,
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
