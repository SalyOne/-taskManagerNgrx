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
import { CreateEditWorkspaceComponent } from './components/create-edit-workspace/create-edit-workspace.component';
import {ActivatedRoute} from "@angular/router";


@NgModule({
  declarations: [
    WorkspaceComponent,
    CreateEditWorkspaceComponent
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
})
export class WorkspaceModule { }
