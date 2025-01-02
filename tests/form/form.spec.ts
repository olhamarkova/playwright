import { test } from "../../fixtures/pages-fixture.ts";
import {
  resultsModalTitle,
  studentData,
  studentInfo,
} from "../../app/modules/form/support/data.ts";
import { Genders, Hobbies } from "../../app/modules/form/support/types.ts";
import { Month } from "../../app/components/support/types/datepicker.ts";

test.describe("Practice Form Tests", () => {
  test.beforeEach(async ({ app: { form }, heading }) => {
    await form.visit();
    await form.verifyHeading(heading.form);
  });

  test("@smoke The Form Should Be Opened", async ({ app: { form } }) => {
    await form.verifyFormTitle();
  });

  test("@functional A User Should Be Able To Fill The Form", async ({
    app: { form },
    person,
  }) => {
    const student = person
      .withFirstname("Janet")
      .withLastName("Doe")
      .withEmail("test@mail.com")
      .withGender(Genders.Female)
      .withMobile("1234567890")
      .withCurrentAdress("Test str., 456, 45 apt.")
      .withSubjects(["Maths", "Chemistry"])
      .withBirthdate("25 June, 1990")
      .withHobby(Hobbies.Reading)
      .withPicture("photo.jpg")
      .withState("Haryana")
      .withCity("Karnal");
    const data = student.person;
    await test.step("Step 1: Fill The Form Inputs", async () => {
      await form.enterData("firstName", data.firstName!);
      await form.form.enterValue(
        form.formInputs("lastName"),
        studentData.lastName
      );
      await form.form.input.fillOut(
        form.formInputs("userEmail"),
        studentData.email
      );
    });

    await test.step("Step 2: Choose Gender", async () => {
      await form.radio.click(form.genderRadio(Genders.Female));
      await form.checkbox.isChecked(form.genderRadio(Genders.Female), true);
    });

    await test.step("Step 3: Enter A Mobile Number", async () => {
      await form.form.input.fillOut(
        form.formInputs("userNumber"),
        studentData.mobile
      );
      await form.form.input.hasValue(
        form.formInputs("userNumber"),
        studentData.mobile
      );
    });

    await test.step("Step 4: Choose The Date Of Birth", async () => {
      const pickedDate = data.birthDate!.replace("e,", "");
      await form.form.click(form.formInputs("dateOfBirthInput"));
      await form.datepicker.isVisible(form.datepicker.getDatepicker());
      await form.datepicker.chooseYear("1990");
      await form.datepicker.chooseMonth(Month.June);
      await form.datepicker.chooseDayByNumber(25);
      await form.form.input.hasValue(
        form.formInputs("dateOfBirthInput"),
        pickedDate
      );
    });

    await test.step("Step 5: Choose The Subject", async () => {
      await form.form.click(form.subjectInput);
      await form.form.input.fillOutSequentially(form.subjectInput, "Ma");
      await form.form.click(form.form.getByText(studentData.subjects[0]));
      await form.form.click(form.subjectInput);
      await form.form.input.fillOutSequentially(form.subjectInput, "Che");
      await form.form.click(form.form.getByText(studentData.subjects[1]));
      await form.chicklet.hasText(form.subjectLabel, studentData.subjects);
    });

    await test.step("Step 6: Choose The Hobby", async () => {
      await form.checkbox.check(form.hobbiesCheckbox(Hobbies.Reading), {
        force: true,
      }); //covered by advertisement
      await form.checkbox.isChecked(
        form.hobbiesCheckbox(Hobbies.Reading),
        true
      );
    });

    await test.step("Step 7: Add A Photo", async () => {
      await form.filechooser.uploadFile(
        form.filechooser.chooseFileButton(),
        studentData.picture
      );
    });

    await test.step("Step 8: Add An Address", async () => {
      await form.form.input.fillOut(
        form.formInputs("currentAddress"),
        studentData.currentAddress
      );
    });

    await test.step("Step 9: Select A State And A City", async () => {
      await form.selector.click(form.stateSelector("state"));
      await form.selector.click(form.selector.getByText(studentData.state));

      await form.selector.click(form.stateSelector("city"));
      await form.selector.click(form.selector.getByText(studentData.city));
    });

    await test.step("Step 10: Submit The Form", async () => {
      await form.form.button.click(form.submitBtn);
      await form.resultsModal.title.hasText(
        form.resultsModal.heading,
        resultsModalTitle
      );
      await form.resultsModal.verifyResultsTable(studentInfo);
      await form.resultsModal.close();
      await form.resultsModal.isVisible(form.resultsModal.modal(), false);
    });
  });
});
