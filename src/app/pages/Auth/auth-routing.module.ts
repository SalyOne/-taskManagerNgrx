import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [

  {
   path: '',
   redirectTo: 'auth/login',
   pathMatch: 'full'

  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
<<<<<<< HEAD
         component: LogInComponent
      },

      {
        path: 'register',
        component: RegisterComponent
=======
        component:LogInComponent
>>>>>>> 81b5115ea5dc4a3759dacd59b6eb480d738a0371
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
