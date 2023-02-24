import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from '@angular/material/card';
import { BoardComponent } from './components/board/board.component';
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AddEditComponent } from './components/board/components/add-edit/add-edit.component';
import { CreateEditWorkspaceComponent } from './components/create-edit-workspace/create-edit-workspace.component';
import {
  InnerWorkspaceComponent
} from './components/inner-workspace/inner-workspace.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from "@angular/material/paginator";
import { WorkspaceListComponent } from './components/workspace-list/workspace-list.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatStepperModule} from '@angular/material/stepper';
import {MatSidenavModule} from "@angular/material/sidenav";
import { IssueTypesComponent } from './components/issue-types/issue-types.component';


@NgModule({
  declarations: [
    WorkspaceComponent,
    BoardComponent,
    AddEditComponent,
    CreateEditWorkspaceComponent,
    InnerWorkspaceComponent,
    WorkspaceListComponent,
    IssueTypesComponent
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
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
    MatSidenavModule
  ],
})
export class WorkspaceModule { }
