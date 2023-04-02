import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {IEpic} from "../../../../../core/interfaces/epic";
import {Subject, switchMap, takeUntil, tap} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {EpicService} from "../../../../../core/services/epic.service";
import {DeletePopupComponent} from "../../../../../shared/popups/delete-popup/delete-popup.component";
import {currentProject, ProjectStateModule} from "../../../../../store/project";
import {Store} from "@ngrx/store";
import {deleteEpics, getEpics, IEpicStateModule, loadEpics} from "../../../../../store/epics";
import {result} from "lodash";

@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.scss']
})
export class EpicComponent implements OnDestroy,AfterViewInit{

  displayedColumns: string[] = ['id', 'name','description','createdAt','updatedAt','actions'];
  sub$ = new Subject();
  isLoading = false;
  loading: boolean = false;
  totalData?: number;
  pageSizes = [5,10,20];
  @ViewChild('paginator') paginator!: MatPaginator;

  dataSource = new MatTableDataSource<IEpic>();
  epics:IEpic[] = []

  constructor(
    private epicService : EpicService,
    private store : Store<{project: ProjectStateModule, epic: IEpicStateModule}>,

    private route : ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) { }

  getEpics(){
    return this.store.select(getEpics)
      .pipe(takeUntil(this.sub$))
      .subscribe(res=>{
        this.epics = res;
        // console.log(res)
        this.dataSource =  new MatTableDataSource<IEpic>(this.epics);
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
            this.getEpics();
            this.store.dispatch(loadEpics());
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
        tap((result)=>{
          if(result){
            this.store.dispatch(deleteEpics({epicId:id}))
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
