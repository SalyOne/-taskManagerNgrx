import {ProjectStateModule} from "./project.reducer";
import {createSelector} from "@ngrx/store";
import {IWorkspace} from "../../core/interfaces";


export  const currentProject = createSelector(
  (state:any) => state.app.project.currentProject,
  (currentProject) => currentProject
)
// const totalProjects =(state:{ project: ProjectStateModule }):number =>{
//   return state.project.projects.length
// }
export const projects = createSelector(
  (state: any) => state.app.project.projects,
  (projects) => projects
)


export const getProject =  createSelector(
  (state:any)=> state.app.project.projects,
  (projects: IWorkspace[], props:{projectId:number}) => projects.find((project)=>project.id === +props.projectId)
)



// export const ProjectSelectors = {
  // totalProjects
// }
