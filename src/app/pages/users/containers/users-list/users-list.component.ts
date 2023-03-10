import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {UsersService} from "../../../../core/services/users.service";
import {QueryTable, User} from "../../../../core/interfaces";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {DeletePopupComponent} from "../../../../shared/popups/delete-popup/delete-popup.component";
import {AddOrEditUsersComponent} from "../../components/add-or-edit-users/add-or-edit-users.component";
import {AddRoleComponent} from "../../components/add-role/add-role.component";
import {IRoles} from "../../../../core/interfaces/roles";



@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {


  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'mobileNumber', 'createdAt', 'actions'];
  sub$ = new Subject();

  user!: User

  empTable!: QueryTable<User>;
  isLoading = false;
  chooseUserActive = false;

  totalData?: number;
  pageSizes = [3, 5, 7];
  dataSource = new MatTableDataSource<User>();

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) {
  }


  getUser() {
    this.usersService.getUsers()
      .subscribe(res => {
        console.log(res, ' log res')
        this.dataSource.data = res;

      });
  }

  ngOnInit(): void {
    this.getUser()

  }

  addUser(id?: number) {

    const dialogRef = this.dialog.open(AddOrEditUsersComponent, {
      data: {
        userId: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUser();
      }
    })
  }
  addRole(user: User) {
    const dialogRef = this.dialog.open(AddRoleComponent, {
      data: {
        user: user,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUser();
      }
    })
  }


  deleteProject(id?: number): void {
    this.openDialog()
      .afterClosed()
      .subscribe(res => {
          if (res) {
            this.usersService.deleteUser(String(id))
              .pipe(takeUntil(this.sub$))
              .subscribe(res => {
                this.router.navigate(['/users'])
              })
          }
        }
      )
  }

  openDialog() {
    return this.dialog.open(DeletePopupComponent, {
      width: '250px',
    });
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }

}
