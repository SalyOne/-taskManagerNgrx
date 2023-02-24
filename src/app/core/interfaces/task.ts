import { IEpic } from "./epic";
import { IIssueType } from "./issue-type";
import {User} from "./user";
import { IWorkspace } from "./workspace.interface";

export interface ITask {
  id: number;
  name: string;
  description: string;
  issueTypeId: number;
  issueType: IIssueType;
  epicId: number;
  epic: IEpic;
  projectId: number;
  project: IWorkspace;
  boardId: number;
  board: string;
  boardColumnId: number;
  boardColumn: string;
  isBacklog: boolean;
  priority: string;
  taskStatus: string;
  assigneeId: number;
  assignee: User;
  reporterId: number;
  reporter: User;
  createdById: number;
  createdBy: User;
  deletedById: number;
  deletedBy: User;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
