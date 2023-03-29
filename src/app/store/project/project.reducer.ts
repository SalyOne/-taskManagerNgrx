import {createReducer, on} from "@ngrx/store";

import {IWorkspace} from "../../core/interfaces";
import {
  initCurrentProject,
  loadProjects,
  loadProjectsFailure,
  loadProjectsSuccess,
  setProjects
} from "./project.actions";


export  interface  ProjectStateModule{
  projects: IWorkspace[],
  currentProject: IWorkspace | null
}

const  initialState :ProjectStateModule= {
  projects:[],
  currentProject:  null
}

export const projectReducer = createReducer(
  initialState,
  on(loadProjects, state => state),
  on(loadProjectsSuccess, (state, action)=>{
    return{
      ...state,
      projects:action.data
    }
  }),
  on(loadProjectsFailure, (state, action)=>state),
  on(setProjects,(state, action)=>{
    const project =  state.projects.find((project)=> project.id === +action.projectId)
   project && localStorage.setItem('project',JSON.stringify(project))
    return {
      ...state,
      currentProject: project || null
    }
  }),
  on(initCurrentProject, (state, action)=>{
    console.log("state: ",state)
    const project = localStorage.getItem('project')
    console.log("project: ",project)
    return{
      ...state,
      currentProject: project ? JSON.parse(project) : null
    }
  })

)
