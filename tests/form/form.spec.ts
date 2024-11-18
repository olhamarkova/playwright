import { test } from "@playwright/test";
import { subCategoriesUrls } from "../../modules/core/support/data.ts";
import { elementPagesHeadings as headings } from "../../modules/elementsPages/support/data.ts";
import { PracticeFormPage } from "../../modules/form/PracticeFormPage.ts";
import {
  formTitle,
  pickedDate,
  resultsModalTitle,
  studentData,
} from "../../modules/form/support/data.ts";
import { Genders, Hobbies } from "../../modules/form/support/types.ts";
import { Month } from "../../uiElements/support/types/DatepickerTypes.ts";

let formPage: PracticeFormPage;

test.beforeEach(async ({ page }) => {
  formPage = new PracticeFormPage(page, subCategoriesUrls.practiceForm);
  await formPage.visit();
});

test.describe("Practice Form Tests", () => {
  test("@smoke The Form Should Be Visible", async () => {
    await test.step("Step 1: Check The Page Heading", async () => {
      await formPage.heading.hasText(formPage.pageTitle("h1"), headings.form);
    });

    await test.step("Step 2: Check The Form Heading", async () => {
      await formPage.heading.hasText(formPage.formTitle, formTitle);
    });
  });

  test("@functional A user Sould Be Able To Fill The Form", async () => {
    await test.step("Step 1: Fill The Name", async () => {
      await formPage.form.input.fillOut(
        formPage.formInputs("firstName"),
        studentData.firstName
      );
      await formPage.form.input.fillOut(
        formPage.formInputs("lastName"),
        studentData.lastName
      );
      await formPage.form.input.hasValue(
        formPage.formInputs("firstName"),
        studentData.firstName
      );
      await formPage.form.input.hasValue(
        formPage.formInputs("lastName"),
        studentData.lastName
      );
    });

    await test.step("Step 2: Fill The Email", async () => {
      await formPage.form.input.fillOut(
        formPage.formInputs("userEmail"),
        studentData.email
      );
      await formPage.form.input.hasValue(
        formPage.formInputs("userEmail"),
        studentData.email
      );
    });

    await test.step("Step 3: Choose Gender", async () => {
      await formPage.radio.clickElement(formPage.genderRadio(Genders.Female));
      await formPage.checkbox.isChecked(
        formPage.genderRadio(Genders.Female),
        true
      );
    });

    await test.step("Step 4: Enter Mobile Number", async () => {
      await formPage.form.input.fillOut(
        formPage.formInputs("userNumber"),
        studentData.mobile
      );
      await formPage.form.input.hasValue(
        formPage.formInputs("userNumber"),
        studentData.mobile
      );
    });

    await test.step("Step 5: Choose The Date Of Birth", async () => {
      await formPage.form.clickElement(formPage.formInputs("dateOfBirthInput"));
      await formPage.datepicker.isElementVisible(
        formPage.datepicker.getDatepicker()
      );
      await formPage.datepicker.chooseYear("1990");
      await formPage.datepicker.chooseMonth(Month.June);
      await formPage.datepicker.chooseDayByNumber(25);
      await formPage.form.input.hasValue(
        formPage.formInputs("dateOfBirthInput"),
        pickedDate
      );
    });

    await test.step("Step 6: Choose The Subject", async () => {
      await formPage.form.clickElement(formPage.subjectInput);
      await formPage.form.input.fillOutSequentially(
        formPage.subjectInput,
        "Ma"
      );
      await formPage.form.clickElement(
        formPage.form.getByText(studentData.subjects[0])
      );
      await formPage.form.clickElement(formPage.subjectInput);
      await formPage.form.input.fillOutSequentially(
        formPage.subjectInput,
        "Che"
      );
      await formPage.form.clickElement(
        formPage.form.getByText(studentData.subjects[1])
      );
      await formPage.chicklet.hasText(
        formPage.subjectLabel,
        studentData.subjects
      );
    });

    await test.step("Step 7: Choose The Hobby", async () => {
      await formPage.checkbox.check(formPage.hobbiesCheckbox(Hobbies.Reading), {
        force: true,
      }); //covered by advertisement
      await formPage.checkbox.isChecked(
        formPage.hobbiesCheckbox(Hobbies.Reading),
        true
      );
    });

    await test.step("Step 8: Add A Photo", async () => {
      await formPage.filechooser.uploadFile(
        formPage.filechooser.getChooseFileButton(),
        studentData.picture
      );
    });

    await test.step("Step 9: Add An Address", async () => {
      await formPage.form.input.fillOut(
        formPage.addressTextArea,
        studentData.currentAddress
      );
      await formPage.form.input.hasValue(
        formPage.addressTextArea,
        studentData.currentAddress
      );
    });

    await test.step("Step 10: Select A State And A City", async () => {
      await formPage.selector.clickElement(
        formPage.stateAndCitySelector("state")
      );
      await formPage.selector.clickElement(
        formPage.selector.getByText(studentData.state)
      );

      await formPage.selector.clickElement(
        formPage.stateAndCitySelector("city")
      );
      await formPage.selector.clickElement(
        formPage.selector.getByText(studentData.city)
      );
    });

    await test.step("Step 11: Submit The Form", async () => {
      await formPage.form.button.clickElement(
        formPage.form.button.getSubmitButton()
      );
      await formPage.resultsModal.title.hasText(
        formPage.resultsModalHeading,
        resultsModalTitle
      );
      await formPage.validateResultsTable();
      await formPage.closeModal();
      await formPage.resultsModal.isElementVisible(
        formPage.resultsModal.getModal(),
        false
      );
    });
  });
});
