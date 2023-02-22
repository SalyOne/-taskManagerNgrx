
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


export interface IQueryTable<T>{
  data: T[],
  totalCount: number,
  page: number,
  limit: number,
}
export interface IWorksoaceUsers{
  projectId: number;
  userIds: string[];
}

