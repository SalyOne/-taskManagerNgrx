import {createSelector} from "@ngrx/store";
import {IEpic} from "../../core/interfaces/epic";

export const getEpics =  createSelector(
  (state:any) => state.app.epic.epics,
  (epics)=> epics
)
export const getEpic = createSelector(
  (state: any) => state.app.epic.epics,
  (epics:IEpic[], props: {epicId: number}) => epics.find((each)=> each.id === +props.epicId)
)
