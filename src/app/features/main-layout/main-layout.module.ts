import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule} from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {MatListModule} from "@angular/material/list";
import {PermissionsDirective} from "../../core/directives/permissions.directive";
import {StoreModule} from "@ngrx/store";
import {ProjectEffect, projectReducer} from "../../store/project";
import {EffectsModule} from "@ngrx/effects";





@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    PermissionsDirective,
    StoreModule.forFeature(
      'project', projectReducer
    ),
    EffectsModule.forFeature([ProjectEffect])

  ],
  exports: [
    MainLayoutComponent
  ]
})
export class MainLayoutModule { }
