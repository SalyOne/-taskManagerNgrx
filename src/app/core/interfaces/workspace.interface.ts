export interface IWorkspace {
  name: "string",
  abbreviation: "string",
  description: "string",
  color: "string"
}
export interface IGetWorkspace {
  "id": number,
  "name":string,
  "abbreviation": string,
  "description": string,
  "color": string,
  "createdAt": string,
  "updatedAt": string,
  "deletedAt": string
}
