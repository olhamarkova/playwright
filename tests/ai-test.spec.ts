//Experimental test using AI

import { aiTest } from "../fixtures/ai-fixture";

aiTest.describe("AI Powered Test", async () => {
  aiTest("Simple AI Test", async ({ ai, page }) => {
    await page.goto(`${process.env.URL}webtables`);

    aiTest.step("Count table rows", async () => {
      const countOfRows = await ai(
        "How many rows with data does the table have?"
      );
      console.log(`The table has ${countOfRows} row(s)`); //Expected output: '3'
    });

    aiTest.step("Check the department", async () => {
      const department = await ai(
        "What department does Kierra Gentry work at?"
      );
      console.log(`The Kierra's department is ${department}`); //Expected output: 'Legal'
    });

    aiTest.step("Open the registration form", async () => {
      await ai("Click the 'Add' button");
      const heading = await ai("Get the text of the modal heading");
      console.log(heading); //Expected output: 'Registration Form'
    });

    aiTest.step("Fill out the form", async () => {
      await ai("Fill out the form with realistic values");
      await ai("Click the 'Submit' button");
    });

    aiTest.step("Count table rows", async () => {
      const countOfRowsAfter = await ai(
        "How many rows with data does the table have?"
      );
      console.log(`The table has ${countOfRowsAfter} row(s)`); //Expected output: '4'
      console.log(`End of the test!`);
    });
  });
});
