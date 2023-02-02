import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutModule } from './core/features/main-layout/main-layout.module';
import { HomeModule} from "./pages/home/home.module";
import {WorkspaceModule} from "./pages/workspace/workspace.module";
import { HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [
    AppComponent
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainLayoutModule,
    HomeModule,
    WorkspaceModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
