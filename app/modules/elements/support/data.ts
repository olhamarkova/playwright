import { Employee } from "./types";

export const callToAction =
  "Please select an item from left to start practice.";

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

export const recordData: Employee = {
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

export const anchors = [
  "Home",
  "Created",
  "No Content",
  "Moved",
  "Bad Request",
  "Unauthorized",
  "Forbidden",
  "Not Found",
];

export const requestLinks = {
  created: { link: "/created", code: 201 },
  noContent: { link: "/no-content", code: 204 },
  moved: { link: "/moved", code: 301 },
  badRequest: { link: "/bad-request", code: 400 },
  unauthorized: { link: "/unauthorized", code: 401 },
  forbidden: { link: "/forbidden", code: 403 },
  notFound: { link: "/invalid-url", code: 404 },
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

//Images
export const subHeadingsText = [
  "Valid image",
  "Broken image",
  "Valid Link",
  "Broken Link",
];

export const imagesSrc = {
  validImage: "/images/Toolsqa.jpg",
  brokenImage: "/images/Toolsqa_1.jpg",
};

export const linksText = {
  valid: "Click Here for Valid Link",
  broken: "Click Here for Broken Link",
};

//Upload and Download
export const pathToUploadedFile = "C:\\fakepath\\photo.jpg";

//Dynamic
export const dynamicText = "This text has random Id";
