import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import { AddRoleComponent } from './components/add-role/add-role.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {StoreModule} from "@ngrx/store";
import {userReducer} from "./store/user.reducer";
import {UserEffects} from "./store/user.effects";
import {EffectsModule} from "@ngrx/effects";


@NgModule({
  declarations: [
    AddRoleComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatCardModule,

    StoreModule.forFeature(
      'user', userReducer
    ),
    EffectsModule.forFeature([UserEffects])
  ],
})
export class UsersModule { }
