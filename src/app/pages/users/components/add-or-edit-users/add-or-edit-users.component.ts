import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Subject} from "rxjs";
import { User} from "../../../../core/interfaces";
import {UsersService} from "../../../../core/services/users.service";
import { MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-or-edit-users',
  templateUrl: './add-or-edit-users.component.html',
  styleUrls: ['./add-or-edit-users.component.scss']
})
export class AddOrEditUsersComponent {
  users!: User
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    mobileNumber: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    identityNumber: new FormControl(null),
    }
  );
  sub$ = new Subject();


  constructor(
    private usersService: UsersService,
    public dialogRef: MatDialogRef<AddOrEditUsersComponent>,

  ) {
  }

  ngOnInit(): void {
  }


  submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      return
    }

    this.usersService.create(this.form.value)
      .subscribe((res) => {
        this.dialogRef.close(res);
        this.usersService.getUsers()
      })

  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }

}
