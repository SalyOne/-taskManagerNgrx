import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InnerWorkspaceRoutingModule } from './inner-workspace-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatStepperModule} from "@angular/material/stepper";
import {MatSidenavModule} from "@angular/material/sidenav";
import {AppRoutingModule} from "../../../../app-routing.module";
import {InnerWorkspaceComponent} from "./inner-workspace.component";
import { IssueTypesAddEditComponent } from './issue-types/issue-types-add-edit/issue-types-add-edit.component';


@NgModule({
  declarations: [
    InnerWorkspaceComponent,
    IssueTypesAddEditComponent
  ],
  imports: [
    CommonModule,
    InnerWorkspaceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    DragDropModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressBarModule,
    MatStepperModule,
    MatSidenavModule,
  ],
  exports:[
    InnerWorkspaceComponent
  ]
})
export class InnerWorkspaceModule { }
