export enum Folders {
  Home = "home",
  Desktop = "desktop",
  Notes = "notes",
  Commands = "commands",
  Documents = "documents",
  Workspace = "workspace",
  Downloads = "downloads",
  WordFile = "wordFile",
  ExcelFile = "excelFile",
  React = "react",
  Angular = "angular",
  Veu = "veu",
  Office = "office",
  Public = "public",
  Private = "private",
  Classified = "classified",
  General = "general",
}

export type ToggleLabel = "Home" | "Documents" | "WorkSpace";

export enum AddRecordInputs {
  First_Name = "firstName",
  Last_Name = "lastName",
  Email = "userEmail",
  Age = "age",
  Salary = "salary",
  Department = "department",
}

export type Employee = {
  firstName: string;
  lastName: string;
  userEmail: string;
  age: string;
  salary: string;
  department: string;
};

export type OutputElementId =
  | "name"
  | "email"
  | "currentAddress"
  | "permanentAddress";

export type InputId =
  | "userName"
  | "userEmail"
  | "currentAddress"
  | "permanentAddress";

export type RadioIds = "yes" | "impressive" | "no";

export type RadioLabel = "Yes" | "Impressive";

export type ClickMeButtons = "Double Click Me" | "Right Click Me" | "Click Me";
