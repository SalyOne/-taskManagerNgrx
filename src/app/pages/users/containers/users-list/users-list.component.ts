import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject} from "rxjs";
import {UsersService} from "../../../../core/services/users.service";
import {QueryTable, User} from "../../../../core/interfaces";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";


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



  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }

}
