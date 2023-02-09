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
    HttpClientModule,
   
  ],
  providers: [
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
