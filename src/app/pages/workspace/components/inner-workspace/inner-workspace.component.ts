import {Component, OnDestroy, OnInit} from '@angular/core';
import {IWorkspace} from "../../../../core/interfaces";
import {Subject, takeUntil, tap} from "rxjs";
import {WorkspaceService} from "../../../../core/services";
import {ActivatedRoute, Router} from "@angular/router";
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {MatDialog} from "@angular/material/dialog";
import {DeletePopupComponent} from "../../../../shared/popups/delete-popup/delete-popup.component";
import {ProjectFacade} from "../../../../facades/project.facade";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-inner-workspace',
  templateUrl: './inner-workspace.component.html',
  styleUrls: ['./inner-workspace.component.scss']
})

export class InnerWorkspaceComponent implements OnDestroy, OnInit{
  workspace!:IWorkspace
  workspaceId! : string;
  loading: boolean = true;
  sub$ = new Subject();
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';


  constructor(
    private workspaceService : WorkspaceService,
    private projectFacade : ProjectFacade,
    private route : ActivatedRoute,
    private router:Router,
    public dialog: MatDialog
  ) {}

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  ngOnInit(): void {
      this.route.params.subscribe(params =>{
        this.workspaceId = params['id']
        this.getOneProject(this.workspaceId)
      })
  }

  selectProject(projectId: any) {
    this.projectFacade.setProject(projectId)
  }

  getOneProject(id: any){
    this.loading  = true
    return this.workspaceService.getOneProject(id)
      .pipe(
        takeUntil(this.sub$)
      )
      .subscribe(res =>{
        console.log(res)
        this.loading = false
        this.workspace = res
        console.log("localstorage", id)
        this.selectProject(res)
      })
  }

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

  ngOnDestroy(): void {
    this.sub$.next(null)
    this.sub$.complete()
  }
}

