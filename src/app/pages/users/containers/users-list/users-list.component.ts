import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {catchError, map, of, startWith, Subject, switchMap, takeUntil} from "rxjs";
import {UsersService} from "../../../../core/services/users.service";
import { QueryTable, User} from "../../../../core/interfaces";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {DeletePopupComponent} from "../../../../shared/popups/delete-popup/delete-popup.component";
import {AddOrEditUsersComponent} from "../../components/add-or-edit-users/add-or-edit-users.component";
import {AddRoleComponent} from "../../components/add-role/add-role.component";
import {Store} from "@ngrx/store";
import {UserStateModel} from "../../store/user.reducer";
import {deleteUser, loadUsers} from "../../store/user.actions";
import {getUsers, isLoading, userTotal} from "../../store";
import {result} from "lodash";



@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements AfterViewInit{

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'mobileNumber','roles', 'createdAt', 'actions'];
  sub$ = new Subject();
  user: User[] = []
  pageSizes = [10,15,20];
  dataSource = new MatTableDataSource<User>();
  isLoading$ = this.store.select(isLoading);
  totalData$ = this.store.select(userTotal);

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private store : Store<{user: UserStateModel}>,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef

  ) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // console.log(this.paginator.page)
    this.loadUsers()
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loadUsers(this.paginator.pageIndex + 1,  this.paginator.pageSize)
          return this.store.select(getUsers).pipe(catchError(() => of(null)));
        }),
        map((empData) => {
          if (empData == null) return [];
          return empData;
        })
      )
      .subscribe((empData) => {
        // console.log(empData)
        // this.user = empData;
        this.dataSource = new MatTableDataSource(empData);
      });
    this.cd.detectChanges()
  }

  loadUsers(page: number = 1, limit: number =10){
    this.store.dispatch(loadUsers({
      page: page,
      limit:limit,
    }))
  }
  addUser(id?: number) {
    const dialogRef = this.dialog.open(AddOrEditUsersComponent, {
      data: {
        userId: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("after closed ")
        this.loadUsers()
      }
    })
  }
  addRole(user: User) {
    const dialogRef = this.dialog.open(AddRoleComponent, {
      data: {
        userData: user,
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
      if (result) {
       this.loadUsers()
      }
    })
  }


  deleteProject(id: number): void {
    this.openDialog()
      .afterClosed()
      .pipe(
        takeUntil(this.sub$),
        switchMap((result)=>{
          if (result){
            this.store.dispatch(deleteUser({id}))
          }
          return of(null)
        })
      )
      .subscribe(res => {
          if (res) {
           this.loadUsers()
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
