import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IWorkspace, User} from "../../../../../core/interfaces";
import {Observable, Subject, takeUntil} from "rxjs";
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {WorkspaceService} from "../../../../../core/services";
import {ProjectFacade} from "../../../../../facades/project.facade";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DeletePopupComponent} from "../../../../../shared/popups/delete-popup/delete-popup.component";
import { BoardService } from 'src/app/core/services/board.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {IBoard} from "../../../../../core/interfaces/board";
import {Store} from "@ngrx/store";
import {currentProject, ProjectStateModule} from "../../../../../store/project";
import {BoardStateModule, getBoards, loadBoards} from "../../../../../store";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})

export class InfoComponent implements OnDestroy, OnInit, AfterViewInit{
  workspace$:Observable<IWorkspace | null> = this.store.select(currentProject);
  workspaceId! : string;
  loading: boolean = false;
  loadBoard: boolean = false;
  loadMember: boolean = false;
  isLoading = false;
  sub$ = new Subject();
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

  totalData?: number;
  pageSizes = [5,10,20];
  displayedColumns: string[] = ['id', 'name','email','createdAt','updatedAt'];

  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource = new MatTableDataSource<User>();
  members: User[] = [];
  constructor(
    private store : Store<{project: ProjectStateModule, board:BoardStateModule}>,
    private workspaceService : WorkspaceService,
    private router:Router,
    public dialog: MatDialog,
    private boardService: BoardService,
    private cd: ChangeDetectorRef

  ) {}
  boards:IBoard[] =[];
  // boards$ = this.boardService.getBoards()
  getBoards(){
    this.store.select(getBoards)
      .pipe(takeUntil(this.sub$))
      .subscribe(boards => {
        console.log("boardssss: ", boards)
        this.boards = boards;
        this.isLoading =true
        console.log("this boardssss: ", this.boards)
      });
  }
  ngOnInit(): void {
    this.loadBoard =true

    this.store.select(currentProject)
      .subscribe((proj)=>{
          if (proj){
            this.store.dispatch(loadBoards())
            this.getBoards();
          }
        }
      )
  }

  getMembers(){
    return this.workspaceService.getProjectUsers()
      .pipe(takeUntil(this.sub$))
      .subscribe(res=>{
        this.members =res;
        this.dataSource =  new MatTableDataSource<User>(this.members);
        this.dataSource.paginator = this.paginator;
      })
  }
  ngAfterViewInit() {

    this.store.select(currentProject)
      .subscribe((proj)=>{
          if (proj){
            this.getMembers()
          }
        }
      )
    // imistvis rom afterViewInit-is mere shecvlilma isLoading cvladma errori ar amoagdos
    this.cd.detectChanges()
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
