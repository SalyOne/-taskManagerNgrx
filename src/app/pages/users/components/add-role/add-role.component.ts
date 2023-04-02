import {Component, Inject} from '@angular/core';
import {FormBuilder,  FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {RoleService} from "../../../../core/services/role.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../../core/interfaces";
import {UsersService} from "../../../../core/services/users.service";
import {IRoles} from 'src/app/core/interfaces/roles';
import {Store} from "@ngrx/store";
import {updateUserRoles, UserStateModel} from "../../store";
import {Actions} from "@ngrx/effects";

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent {
  form: FormGroup = new FormGroup({
    // roles: new FormControl([], Validators.required)
  });

  roles$: Observable<IRoles[]> = this.roleService.getAllRoles();

  constructor(
    private store: Store<{ user: UserStateModel }>,
    private action$: Actions,
    public dialogRef: MatDialogRef<AddRoleComponent>,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { userData: User },
  ) {
  }

  ngOnInit(): void {
    if (this.data.userData.roles) {
      this.form = this.formBuilder.group({
        roles: [this.data.userData.roles.map((e: IRoles) => e.id), [Validators.required]]
      })
    }

    this.action$.subscribe((res) => {
      this.dialogRef.close(res);
    })
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const {roles} = this.form.value;
    this.store.dispatch(updateUserRoles({
      userId: this.data.userData.id,
      roleIds: roles
    }));
  }
}
