import {Component, OnInit} from '@angular/core';
import {IWorkspace} from "../../../../core/interfaces";
import {WorkspaceService} from "../../../../core/services";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectFacade} from "../../../../facades/project.facade";
import {Subject} from "rxjs";
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";

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

export class InnerWorkspaceComponent implements  OnInit{
  workspace!:IWorkspace;
  loading: boolean = true;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  sub$ = new Subject();

  constructor(
    private projectFacade : ProjectFacade,
    private workspaceService: WorkspaceService,
    private route : ActivatedRoute,
  ) {

  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  selectProject(projectId: any) {
    console.log("in selectProject: " , projectId)
    this.projectFacade.setProject(projectId)
  }

  ngOnInit(): void {
    console.log("facade :", this.projectFacade.getProject())
    this.workspace = this.projectFacade.getProject()


    this.route.params.subscribe(params =>{
      // this.workspaceId = params['id']
      console.log("in facade page: ", params);
      this.getOneProject(params['id']);
      // this.getOneProject(this.workspaceId)
    })
  }

  getOneProject(id: any){
    return this.workspaceService.getOneProject(id)
      .subscribe(res =>{
        this.loading  = true;
        this.workspace = res;
        this.loading = false;
        this.selectProject(res);
        // console.log("localstorage", id)
      })
  }
}

