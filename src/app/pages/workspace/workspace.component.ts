import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WorkspaceService} from "../../core/services/workspace.service";
import {Subject, takeUntil} from "rxjs";
import {ThemePalette} from "@angular/material/core";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {IWorkspace} from "../../core/interfaces";

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnDestroy, AfterViewInit, OnInit{

  displayedColumns: string[] = ['id', 'name', 'abbreviation',  'description', 'color','createdAt','updatedAt','deletedAt','actions'];
  workspaces:IWorkspace[] = []
  dataSource!: any
    sub$ = new Subject();
  @ViewChild(MatPaginator) paginator!: MatPaginator ;


  constructor(
    private workspaceService:WorkspaceService
  ) { }

  getWorkspaces(){
    return this.workspaceService.getAllWorkspaces()
      .pipe(takeUntil(this.sub$))
      .subscribe(res=>{
        this.workspaces =res;
        this.dataSource =  new MatTableDataSource<IWorkspace>(this.workspaces);
        console.log(this.workspaces)
      })
  }

  ngOnInit(): void {
    this.getWorkspaces()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }

  // dataSource = new MatTableDataSource<IWorkspace>(this.workspaces);

  // const ELEMENT_DATA: IWorkspace[] =
}

