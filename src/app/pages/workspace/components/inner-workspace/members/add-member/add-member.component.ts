import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IWorkspace, User} from "../../../../../../core/interfaces";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {UsersService} from "../../../../../../core/services/users.service";
import {WorkspaceService} from "../../../../../../core/services";

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  // members$: Observable<User[]> = this.usersService.getUsers();
  addedMembers:User[] = []
  loading: Boolean  = false;
  memIds: number[]=[]
  allUsers:User[] = []

  constructor(
    public dialogRef: MatDialogRef<AddMemberComponent>,
    private usersService: UsersService,
    private workspaceService: WorkspaceService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { project: IWorkspace },
  ) {

  }
  setWorkspaceMembers(){
    return this.workspaceService.getProjectUsers()
      .pipe(
        map(re=> {
          re.forEach((each:any)=>{
            this.memIds.push(each.id)
            return each.id
          })
        })
      ).subscribe(res=>{
        this.loading = false
        this.form = this.formBuilder.group({
          members:[this.memIds , [Validators.required]]
        })
    })
  }
  getAllUsers(){
    return this.usersService.getUsers()
      .subscribe(res=>{
        // console.log("users: ",res)
        this.allUsers = res
      })
  }
  ngOnInit(): void {
    this.loading = true
    this.getAllUsers();
    this.setWorkspaceMembers()
  }

  submit() {
    if (this.form.invalid) return;
    if (!this.data.project.id) return;

    const {members} = this.form.value;
    console.log("on submit values",members)
    this.workspaceService.addUsersToWorkspace({
      projectId: this.data.project.id,
      userIds:members
    })
      .subscribe((res) => {
        this.dialogRef.close(true);
      })
  }
}
