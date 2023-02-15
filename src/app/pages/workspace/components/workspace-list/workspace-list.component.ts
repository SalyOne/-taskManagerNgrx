import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IWorkspace} from "../../../../core/interfaces";
import {Subject, takeUntil} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {WorkspaceService} from "../../../../core/services";
import {MatTableDataSource} from "@angular/material/table";
import {DeletePopupComponent} from "../../../../shared/popups/delete-popup/delete-popup.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-workspace-list',
  templateUrl: './workspace-list.component.html',
  styleUrls: ['./workspace-list.component.scss']
})
export class WorkspaceListComponent implements OnDestroy, AfterViewInit, OnInit{

  displayedColumns: string[] = ['id', 'name', 'abbreviation',  'description', 'color','createdAt','updatedAt','actions'];
  workspaces:IWorkspace[] = []
  dataSource!: any
  sub$ = new Subject();
  @ViewChild(MatPaginator) paginator!: MatPaginator ;


  constructor(
  private workspaceService : WorkspaceService,
  private route : ActivatedRoute,
  private router:Router,
  public dialog: MatDialog
  ) { }

  getWorkspaces(){
    return this.workspaceService.getAllWorkspaces()
      .pipe(takeUntil(this.sub$))
      .subscribe(res=>{
        this.workspaces =res;
        this.dataSource =  new MatTableDataSource<IWorkspace>(this.workspaces);
        this.dataSource.paginator = this.paginator;
        console.log(this.workspaces)
      })
  }

  ngOnInit(): void {
    this.getWorkspaces()
  }
  ngAfterViewInit() {

  }
  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }

  // dataSource = new MatTableDataSource<IWorkspace>(this.workspaces);

  // const ELEMENT_DATA: IWorkspace[] =
  deleteProject(id?: number):void {
    this.openDialog().afterClosed().subscribe(res=>{
        if(res){
          this.workspaceService.deleteProject(String(id))
            .pipe(takeUntil(this.sub$))
            .subscribe(res=>{
              this.router.navigate(['/home'])
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
}
