export const callToAction =
  "Please select an item from left to start practice.";

export const elementPagesHeadings = {
  textBox: "Text Box",
  checkbox: "Check Box",
  radioButton: "Radio Button",
  webTables: "Web Tables",
  buttons: "Buttons",
  links: "Links",
};

//Text Box
export const textBoxPlaceholders = {
  fullName: "Full Name",
  email: "name@example.com",
  currentAddress: "Current Address",
};

export const userData = {
  fullName: "test",
  email: "test@gmail.com",
  currentAddress: "test street 1",
  permanentAddress: "test street 2",
};

//Radio Buttons
export const questionText = "Do you like the site?";

//Web Tables
export const columnHeaders = [
  "First Name",
  "Last Name",
  "Age",
  "Email",
  "Salary",
  "Department",
  "Action",
];

export const recordData = {
  firstName: "John",
  lastName: "Doe",
  userEmail: "johndoe@gmail.com",
  age: "40",
  salary: "55600",
  department: "AQA",
};

//Buttons
export const successMessages = {
  doubleClick: "You have done a double click",
  rightClick: "You have done a right click",
  dynamicClick: "You have done a dynamic click",
};

//Links
export const subHeadings = [
  "Following links will open new tab",
  "Following links will send an api call",
];

export const linkNames = [
  "Home",
  //"HomeUh4Ys",
  "Created",
  "No Content",
  "Moved",
  "Bad Request",
  "Unauthorized",
  "Forbidden",
  "Not Found",
];

export const requestLinks = {
  created: "/created",
  noConten: "/no-content",
  moved: "/moved",
  badRequest: "/bad-request",
  unauthorized: "/unauthorized",
  forbidden: "/forbidden",
  notFound: "/invalid-url",
};

export const responseStatuses = new Map([
  [201, "Created"],
  [204, "No Content"],
  [301, "Moved Permanently"],
  [400, "Bad Request"],
  [401, "Unauthorized"],
  [403, "Forbidden"],
  [404, "Not Found"],
]);
