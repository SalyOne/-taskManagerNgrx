import {Component, Inject, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Subject} from "rxjs";
import { User} from "../../../../core/interfaces";
import {UsersService} from "../../../../core/services/users.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {createUser, createUserSuccess, getUserById, updateUser, UserStateModel} from "../../store";
import {Actions, ofType} from "@ngrx/effects";

@Component({
  selector: 'app-add-or-edit-users',
  templateUrl: './add-or-edit-users.component.html',
  styleUrls: ['./add-or-edit-users.component.scss']
})
export class AddOrEditUsersComponent {
  @Input() id?: string
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
    private store : Store<{user: UserStateModel}>,
    private usersService: UsersService,
    private action$: Actions,
    public dialogRef: MatDialogRef<AddOrEditUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
  }

  ngOnInit(): void {
    if (this.data.userId) {
      this.store.select(getUserById(this.data.userId))
        .subscribe((res) => {
          if(!res) return;
          this.form.patchValue(res);
        })
    }
    this.action$.pipe(
      ofType(createUserSuccess)
    )
      .subscribe((res)=>{
        this.dialogRef.close(res);
      })
  }
  Submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      return
    }
    const {id, ...data} = this.form.value;
    if (id) {
      this.store.dispatch(updateUser({user: this.form.value}))
    } else {
      this.store.dispatch(createUser({user: this.form.value}))
    }
    // this.usersService.createUser(this.form.value)
    //   .subscribe((res) => {
    //     this.dialogRef.close(res);
    //   })
  }


  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }

}
