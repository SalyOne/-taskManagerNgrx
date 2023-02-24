export interface User {
  data: User[];
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userPermissions: any[];
  roles: any[];
  projects: any[];
}

export interface QueryTable<T> {
  data: T[],
  totalCount: number,
  page: number,
  limit: number,
}
