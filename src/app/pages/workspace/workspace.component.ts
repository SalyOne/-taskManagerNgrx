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
  form: FormGroup = new FormGroup({
    name : new FormControl('', [Validators.required]),
    abbreviation : new FormControl('', [Validators.required]),
    description : new FormControl('',[Validators.required]),
    color : new FormControl('',[Validators.required]),
    }
  );
 sub$ = new Subject();


  constructor(
    private workspaceService:WorkspaceService
  ) {
  }
  submit(){
    this.form.markAllAsTouched();
    if(this.form.invalid) return;
    console.log(this.form.value)
    this.workspaceService.addWorkspace(this.form.value)
      .pipe(takeUntil(this.sub$))
      .subscribe(res =>{
        console.log("ress:" +
          " " , res)
      })
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }

}
