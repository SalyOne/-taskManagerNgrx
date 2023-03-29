import {ProjectStateModule} from "./project.reducer";
import {createSelector} from "@ngrx/store";


export  const currentProject = createSelector(
  (state:any) => state.project.currentProject,
  (currentProject) => currentProject
)
const totalProjects =(state:{ project: ProjectStateModule }):number =>{
  return state.project.projects.length
}
export const ProjectSelectors = {
  totalProjects
}
