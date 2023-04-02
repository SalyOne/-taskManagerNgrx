import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IWorkspace, User} from "../../../../../../core/interfaces";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, Subject, takeUntil, tap} from "rxjs";
import {UsersService} from "../../../../../../core/services/users.service";
import {WorkspaceService} from "../../../../../../core/services";
import {Store} from "@ngrx/store";
import {currentProject, getProjectUsers, ProjectStateModule, setProjectUsers} from "../../../../../../store";
import {InnerWorkspaceModule} from "../../inner-workspace.module";
import {createIssueType} from "../../../../../../store/issue-types";

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit{
  // form: FormGroup = new FormGroup({});
  // members$: Observable<User[]> = this.usersService.getUsers();


  form: FormGroup = new FormGroup({
    // members: new FormControl([], Validators.required)
  });

  members$: Observable<User[]> = this.usersService.getUsersall()
  addedMembers:User[] = []
  loading: Boolean  = false;
  memIds: number[]=[]
  allUsers:User[] = []
  private sub$ = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {  mems: User[] },
    public dialogRef: MatDialogRef<AddMemberComponent>,
    private usersService: UsersService,
    private workspaceService: WorkspaceService,
    private formBuilder: FormBuilder,
    private store:Store<{projects: ProjectStateModule}>,
  ) {}


  ngOnInit(): void {
    if (this.data.mems) {
      console.log("members", this.data.mems)

      this.form = this.formBuilder.group({
        members:[this.data.mems.map((r:User) => r.id), [Validators.required]]
      })
      // this.form.patchValue({
      //   roles: this.data.mems.map((r:User) => r.id)
      // })
    }
  }
  submit() {
    if (this.form.invalid) return;

    this.store.select(currentProject).pipe(
      takeUntil(this.sub$),
      tap((res)=>{

        const {members} = this.form.value;
        this.store.dispatch(setProjectUsers({
          projectId: res.id,
          userIds:members}
        ))

      })
    ).subscribe()

      // .subscribe((res) => {
      //   this.dialogRef.close(true);
      // })
  }





}
