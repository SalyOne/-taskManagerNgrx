import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core';
import {Subject, takeUntil, tap} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DeletePopupComponent} from "../../../../../shared/popups/delete-popup/delete-popup.component";
import {IIssueType} from "../../../../../core/interfaces/issue-type";
import {Store} from "@ngrx/store";
import {currentProject, ProjectStateModule} from "../../../../../store";
import {deleteIssueType, getIssueTypes, IssueTypesStateModule, loadIssueTypes} from "../../../../../store/issue-types";

@Component({
  selector: 'app-issue-types',
  templateUrl: './issue-types.component.html',
  styleUrls: ['./issue-types.component.scss']
})
export class IssueTypesComponent implements OnDestroy,AfterViewInit{

  displayedColumns: string[] = ['id', 'name','description','icon', 'color','type','isActive','createdAt','updatedAt','actions'];
  dataSource = new MatTableDataSource<IIssueType>();
  @ViewChild('paginator') paginator!: MatPaginator;
  issueTypes: IIssueType[] = [] // EmpData
  sub$ = new Subject();
  isLoading = false;
  loading: Boolean = false;
  totalData?: number;
  pageSizes = [5,10,20];
  constructor(
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private store : Store<{project: ProjectStateModule, issueTypes: IssueTypesStateModule}>,
  ) { }

  getIssueTypes(){
    // console.log("in getIssues")
    return this.store.select(getIssueTypes)
      .pipe(takeUntil(this.sub$))
      .subscribe(res=>{

        this.issueTypes = res;
        this.dataSource =  new MatTableDataSource<IIssueType>(this.issueTypes);
        this.dataSource.paginator = this.paginator;
        // this.isLoading =false
        // this.loading = false
      })
  }
  ngAfterViewInit() {
    this.isLoading = true
    this.loading =true
    this.store.select(currentProject)
      .subscribe((proj)=>{
          if (proj){
            this.getIssueTypes()
            this.store.dispatch(loadIssueTypes())
            this.isLoading = false
            this.loading =false
          }
        }
      )
    // imistvis rom afterViewInit-is mere shecvlilma isLoading cvladma errori ar amoagdos
    this.cd.detectChanges()
  }

  deleteProject(id: number):void {
    this.openDialog().afterClosed()
      .pipe(
        takeUntil(this.sub$),
        tap((res)=>{
          if(res){
            this.store.dispatch(deleteIssueType({issueId: id}))
          }
        })
      )
      .subscribe()
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
