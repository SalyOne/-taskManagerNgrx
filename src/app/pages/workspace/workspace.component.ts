import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WorkspaceService} from "../../core/services/workspace.service";
import {Subject, takeUntil} from "rxjs";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnDestroy{

 sub$ = new Subject();


  constructor() { }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }

}
