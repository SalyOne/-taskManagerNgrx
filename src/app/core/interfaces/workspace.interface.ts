
export interface IWorkspace {
  "id"?: number,
  "name":string,
  "abbreviation": string,
  "description": string,
  "color": string,
  "createdAt"?: string,
  "updatedAt"?: string,
  "deletedAt"?: string
}


export interface IWorkspaceTable{
  data: IWorkspace[],
  totalCount: number,
  page: number,
  limit: number,
}

