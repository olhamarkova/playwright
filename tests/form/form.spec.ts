import { test } from "../../fixtures/pages-fixture.ts";
import { Genders, Hobbies } from "../../app/modules/form/support/types.ts";
import { Person } from "../../utils/buildPerson.ts";

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
    let data: Person = {};
    test.step("Step 0: Prepare the test data", async () => {
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
      data = student.person;
    });

    await test.step("Step 1: Fill The Form Inputs", async () => {
      await form.enterData("firstName", data.firstName!);
      await form.enterData("lastName", data.lastName!);
      await form.enterData("userEmail", data.email!);
    });

    await test.step("Step 2: Set Gender", async () => {
      await form.setGender(Genders.Female);
      await form.verifyGenderSet(Genders.Female);
    });

    await test.step("Step 3: Enter A Mobile Number", async () => {
      await form.enterData("userNumber", data.mobile!);
    });

    await test.step("Step 4: Set The Date Of Birth", async () => {
      await form.openCalendar();
      await form.verifyCalendarOpened();
      await form.setDateOfBirth(data);
      await form.verifyDateSet(data);
    });

    await test.step("Step 5: Specify Subjects", async () => {
      await form.specifySubject(data.subjects![0]);
      await form.specifySubject(data.subjects![1]);
      await form.verifySubjects(data.subjects!);
    });

    await test.step("Step 6: Set The Hobby", async () => {
      await form.setHobby(Hobbies.Reading);
      await form.verifyHobbySet(Hobbies.Reading);
    });

    await test.step("Step 7: Add A Photo", async () => {
      await form.addPhoto(data.picture!);
    });

    await test.step("Step 8: Enter An Address", async () => {
      await form.enterData("currentAddress", data.currentAddress!);
    });

    await test.step("Step 9: Select A State And A City", async () => {
      await form.specifyState("state", data.state!);
      await form.specifyState("city", data.city!);
    });

    await test.step("Step 10: Submit The Form", async () => {
      await form.submit();
      await form.resultsModal.verifyOpened();
      await form.resultsModal.verifyResultsTable(data);
    });

    await test.step("Step 11: Close The Modal", async () => {
      await form.resultsModal.close();
      await form.resultsModal.verifyClosed();
    });
  });
});
