import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {catchError, map, of, startWith, Subject, switchMap, takeUntil} from "rxjs";
import {IQueryTable} from "../../../../../core/interfaces";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {WorkspaceService} from "../../../../../core/services";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DeletePopupComponent} from "../../../../../shared/popups/delete-popup/delete-popup.component";
import {IIssueType} from "../../../../../core/interfaces/issue-type";
import {IssueTypesService} from "../../../../../core/services/issue-types.service";

@Component({
  selector: 'app-issue-types',
  templateUrl: './issue-types.component.html',
  styleUrls: ['./issue-types.component.scss']
})
export class IssueTypesComponent implements OnDestroy,AfterViewInit, OnInit{

  displayedColumns: string[] = ['id', 'name','description','icon', 'color','type','isActive','createdAt','updatedAt','actions'];
  dataSource = new MatTableDataSource<IIssueType>();
  @ViewChild('paginator') paginator!: MatPaginator;


  issueTypes: IIssueType[] = [] // EmpData
  sub$ = new Subject();
  empTable!: IQueryTable<IIssueType>;
  isLoading = false;

  totalData?: number;
  pageSizes = [5,10,20];


  constructor(
    private issueTypesService : IssueTypesService,
    private route : ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) { }

  getIssueTypes(){
    console.log("in getIssues")
    return this.issueTypesService.getAllIssueTypes()
      .pipe(takeUntil(this.sub$))
      .subscribe(res=>{
        this.issueTypes = res;
        this.dataSource =  new MatTableDataSource<IIssueType>(this.issueTypes);
        this.dataSource.paginator = this.paginator;
        this.isLoading =false
      })
  }

  // getProjectsByParams(limit:number,pageIndex:number ){
  //   console.log("in getparams")
  //   return this.issueTypesService.getIssueTypesByParams({
  //     page:pageIndex,
  //     totalCount:length,
  //     limit:limit
  //   })
  //   // .pipe(takeUntil(this.sub$))
  //   // .subscribe(res=>{
  //   //   console.log("asdasd")
  //   //   this.issueTypes = res;
  //   //   this.dataSource =  new MatTableDataSource<IIssueType>(this.issueTypes);
  //   //   console.log(this.pageEvent)
  //   // })
  // }


  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // console.log(this.paginator.page)
    this.isLoading = true
    this.getIssueTypes()
    // imistvis rom afterViewInit-is mere shecvlilma isLoading cvladma errori ar amoagdos
    this.cd.detectChanges()
  }

  ngOnInit(): void {
    // this.getIssueTypes()
    // this.getProjectsByParams(6,1)
  }



  deleteProject(id?: number):void {
    this.openDialog().afterClosed().subscribe(res=>{
        if(res){
          this.issueTypesService.deleteIssueType(String(id))
            .pipe(takeUntil(this.sub$))
            .subscribe(res=>{
              // this.router.navigate(['/types'])
              console.log('get delete issue',  res)
              this.getIssueTypes()
            })
        }
      }
    )
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
