import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent {
  form: FormGroup = new FormGroup({
    workName : new FormControl('', [Validators.required]),
    abbr : new FormControl('', [Validators.required])
    }
  );

  // getErrorMessage() {
  //   if (this.name.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //   return this.name.hasError('name') ? 'Not a valid name' : '';
  // }
}
