//Experimental test using AI

import { aiTest as test } from "../fixtures/ai-fixture";

test.describe("AI Powered Test", async () => {
  test("Simple AI Test", async ({ ai, page }) => {
    await page.goto(`${process.env.URL}webtables`);

    await test.step("Count table rows", async () => {
      const countOfRows = await ai(
        "How many rows with data does the table have?"
      );
      console.log(`The table has ${countOfRows} row(s)`); //Expected output: '3'
    });

    await test.step("Check the department", async () => {
      const department = await ai(
        "What department does Kierra Gentry work at?"
      );
      console.log(`The Kierra's department is ${department}`); //Expected output: 'Legal'
    });

    await test.step("Open the registration form", async () => {
      await ai("Click the 'Add' button");
      const heading = await ai("Get the text of the modal heading");
      console.log(heading); //Expected output: 'Registration Form'
    });

    await test.step("Fill out the form", async () => {
      await ai("Fill out the form with realistic values");
      await ai("Click the 'Submit' button");
    });

    await test.step("Count table rows", async () => {
      const countOfRowsAfter = await ai(
        "How many rows with data does the table have?"
      );
      console.log(`The table has ${countOfRowsAfter} row(s)`); //Expected output: '4'
      console.log(`End of the test!`);
    });
  });
});
