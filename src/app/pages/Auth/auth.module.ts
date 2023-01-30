import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';



  


@NgModule({
  declarations: [
    AuthComponent,
    LogInComponent,
    RegisterComponent,


  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
    
  ]
})
export class AuthModule { }
