import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutModule } from './features/main-layout/main-layout.module';
import { HomeModule} from "./pages/home/home.module";
import { WorkspaceModule} from "./pages/workspace/workspace.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors';
import { UsersComponent } from './pages/users/users.component';
import { UsersListComponent } from './pages/users/containers/users-list/users-list.component';
import { AddOrEditUsersComponent } from './pages/users/components/add-or-edit-users/add-or-edit-users.component';
import {MatTableModule} from "@angular/material/table";
import {ProjectInterceptor} from "./core/interceptors/project.interceptor";
import { DeletePopupComponent } from './shared/popups/delete-popup/delete-popup.component';
import {SharedModule} from "./shared/shared.module";






@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UsersListComponent,
    AddOrEditUsersComponent
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainLayoutModule,
    HomeModule,
    WorkspaceModule,
    HttpClientModule,
    SharedModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProjectInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
