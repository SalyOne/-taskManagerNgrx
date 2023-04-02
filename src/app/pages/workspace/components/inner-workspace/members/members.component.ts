import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {map, Observable, Subject, takeUntil, tap} from "rxjs";
import {User} from "../../../../../core/interfaces";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {DeletePopupComponent} from "../../../../../shared/popups/delete-popup/delete-popup.component";
import {AddMemberComponent} from "./add-member/add-member.component";
import {Store} from "@ngrx/store";
import {
  currentProject,
  deleteProjectUser,
  loadProjectUser, projects,
  ProjectStateModule,
} from "../../../../../store/project";
import {getProjectUsers} from "../../../../../store/project/project.selectors";
import {createIssueType} from "../../../../../store/issue-types";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements  AfterViewInit, OnDestroy{

  displayedColumns: string[] = ['id', 'name','email','createdAt','updatedAt','actions'];
  sub$ = new Subject();
  isLoading = false;
  loading: boolean = false;
  totalData?: number;
  pageSizes = [5,10,20];
  @ViewChild('paginator') paginator!: MatPaginator;


  dataSource = new MatTableDataSource<User>();
  members: User[] = [];


  countMembers$: Observable<number> = this.store.select(getProjectUsers).pipe(
    map((res)=> {
      console.log("in countMembers",res)
      return res.length
    })
  )
  constructor(
    private store : Store<{project: ProjectStateModule}>,

    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {
  }

  get project(){
    return this.store.select(currentProject)
  }

  getMembers(){
    return this.store.select(getProjectUsers)
      .pipe(takeUntil(this.sub$))
      .subscribe(res=>{
        // console.log("get members",res)
        this.members =res;
        this.dataSource =  new MatTableDataSource<User>(this.members);
        this.dataSource.paginator = this.paginator;
        this.isLoading =false
        this.loading = false
      })
  }
  ngAfterViewInit() {
    this.isLoading = true
    this.loading =true

    this.store.select(currentProject)
      .subscribe((proj)=>{
          if (proj){
            this.store.dispatch(loadProjectUser())
            this.getMembers()
          }
        }
      )
    // imistvis rom afterViewInit-is mere shecvlilma isLoading cvladma errori ar amoagdos
    this.cd.detectChanges()
  }
  delete(id: number):void {
    this.openDialog().afterClosed()
      .pipe(
        takeUntil(this.sub$),
        tap((res)=>{
          if(res){
            this.store.dispatch(deleteProjectUser({userId: id}))
          }
        })
      )
      .subscribe()
  }
  addMember(mems:User[]) {
    this.store.select(currentProject).pipe(
      takeUntil(this.sub$),
      tap((res)=>{
        const dialogRef = this.dialog.open(AddMemberComponent,{
          data:{
            mems:mems
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            // console.log("after dialog closed")
            this.getMembers();
          }
        })
      })
    ).subscribe()
  }
  openDialog(){
    return  this.dialog.open(DeletePopupComponent, {
      width: '250px',
    });
  }
  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }
}
