// import { test } from "../../fixtures/pages-fixture.ts";
// import { questionText } from "../../app/modules/elements/support/data.ts";
// import { headings } from "../../app/modules/core/support/data.ts";

// test.describe("Radio Buttons Page Tests", () => {
//   test.beforeEach(async ({ radioPage }) => {
//     await radioPage.visit();
//   });

//   test("@smoke The Radio Button Page Should Have All The Expected Elements", async ({
//     radioPage,
//   }) => {
//     await test.step("Step 1: Check The Page Heading", async () => {
//       await radioPage.heading.hasText(
//         radioPage.heading.getHeading("h1"),
//         headings.radioButton
//       );
//     });

//     await test.step("Step 2: Check The Question", async () => {
//       await radioPage.textBox.hasText(radioPage.question, questionText);
//     });

//     await test.step("Step 3: Check The Buttons", async () => {
//       await radioPage.radio.areVisible(radioPage.radioButtons);
//       await radioPage.radio.isEnabled(radioPage.radioButton("no"), false);
//       await radioPage.validateEnabledRadio();
//     });
//   });

//   test("@functional The User Shall Be Able To Choose Any Option", async ({
//     radioPage,
//   }) => {
//     await test.step("Step 1: Choose 'Yes'", async () => {
//       await radioPage.radio.click(radioPage.labelForRadio("Yes"));
//       await radioPage.validateSuccessMessage("Yes");
//     });

//     await test.step("Step 2: Choose 'Impressive'", async () => {
//       await radioPage.radio.click(radioPage.labelForRadio("Impressive"));
//       await radioPage.validateSuccessMessage("Impressive");
//     });
//   });
// });
