import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {BacklogComponent} from "./backlog.component";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {BacklogEffects, backlogReducer} from "./store";



@NgModule({
  declarations: [
    BacklogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BacklogComponent
      },
    ]),
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    StoreModule.forFeature('backlog', backlogReducer),
    EffectsModule.forFeature([BacklogEffects])],
})
export class BacklogModule { }
