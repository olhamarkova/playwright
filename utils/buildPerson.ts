export type Person = {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  currentAddress?: string;
  permanentAddress?: string;
  age?: string;
  salary?: string;
  department?: string;
  gender?: string;
  mobile?: string;
  birthDate?: string;
  subjects?: ["Maths", "Chemistry"];
  picture?: string;
  hobby?: string;
  state?: State;
  city?: City;
};

type State = "NCR" | "Uttar Pradesh" | "Haryana" | "Rajasthan";
type City = "Karnal" | "Panipat" | "Jaipur" | "Jaiselmer";

export class BuildPerson {
  public person: Person;

  constructor() {
    this.person = {};
  }

  withFirstname(firstName: string) {
    this.person.firstName = firstName;
    return this;
  }

  withLastName(lastName: string) {
    this.person.lastName = lastName;
    return this;
  }

  withFullName(fullName: string) {
    this.person.fullName = fullName;
    return this;
  }

  withEmail(email: string) {
    this.person.email = email;
    return this;
  }

  withCurrentAdress(currentAddress: string) {
    this.person.currentAddress = currentAddress;
    return this;
  }

  withPermanentAddress(permanentAddress: string) {
    this.person.permanentAddress = permanentAddress;
    return this;
  }

  withAge(age: string) {
    this.person.age = age;
    return this;
  }

  withSalary(salary: string) {
    this.person.salary = salary;
    return this;
  }

  withDepartment(department: string) {
    this.person.department = department;
    return this;
  }

  withGender(gender: string) {
    this.person.gender = gender;
    return this;
  }

  withMobile(mobile: string) {
    this.person.mobile = mobile;
    return this;
  }

  withBirthdate(birthDate: string) {
    this.person.birthDate = birthDate;
    return this;
  }

  withSubjects(subjects: ["Maths", "Chemistry"]) {
    this.person.subjects = subjects;
    return this;
  }

  withPicture(picture: string) {
    this.person.picture = picture;
    return this;
  }

  withHobby(hobby: string) {
    this.person.hobby = hobby;
    return this;
  }

  withState(state: State) {
    this.person.state = state;
    return this;
  }

  withCity(city: City) {
    this.person.city = city;
    return this;
  }
}
