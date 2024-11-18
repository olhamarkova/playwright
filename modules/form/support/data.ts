export const formTitle = "Student Registration Form";

export const resultsModalTitle = "Thanks for submitting the form";

export const studentData = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jdoe@testemail.com",
  gender: "Female",
  mobile: "1234567890",
  birthDate: "25 June, 1990",
  subjects: ["Maths", "Chemistry"],
  currentAddress: "Test str., 456, 45 apt.",
  picture: "photo.jpg",
  hobby: "Reading",
  state: "Haryana",
  city: "Karnal",
};

export const pickedDate = studentData.birthDate.replace("e,", "");

const dateOfBirth = studentData.birthDate.replace(", ", ",");
const subjects = studentData.subjects.toString().replace(",", ", ");

export const studentInfo = new Map<string, string>([
  ["Student Name", `${studentData.firstName} ${studentData.lastName}`],
  ["Student Email", `${studentData.email}`],
  ["Gender", `${studentData.gender}`],
  ["Mobile", `${studentData.mobile}`],
  ["Date of Birth", `${dateOfBirth}`],
  ["Subjects", `${subjects}`],
  ["Hobbies", `${studentData.hobby}`],
  ["Picture", `${studentData.picture}`],
  ["Address", `${studentData.currentAddress}`],
  ["State and City", `${studentData.state} ${studentData.city}`],
]);
