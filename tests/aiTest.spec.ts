//Experimental test using AI

import { aiTest } from "../fixtures/aiFixture";

aiTest.describe("AI Powered Test", async () => {
  aiTest("Simple AI Test", async ({ ai, page }) => {
    await page.goto("https://demoqa.com/webtables");

    //Count table rows
    const countOfRows = await ai(
      "How many rows with data does the table have?"
    );
    console.log(`The table has ${countOfRows} row(s)`); //Expected output: '3'

    //Get a department
    const department = await ai("What department does Kierra Gentry work at?");
    console.log(`The Kierra's department is ${department}`); //Expected output: 'Legal'

    //Click the button
    await ai("Click the 'Add' button");
    const heading = await ai("Get the text of the modal heading");
    console.log(heading); //Expected output: 'Registration Form'

    //Fill out the form
    await ai("Fill out the form with realistic values");
    await ai("Click the 'Submit' button");

    //Count table rows
    const countOfRowsAfter = await ai(
      "How many rows with data does the table have?"
    );
    console.log(`The table has ${countOfRowsAfter} row(s)`); //Expected output: '4'
    console.log(`End of the test!`);
  });
});
