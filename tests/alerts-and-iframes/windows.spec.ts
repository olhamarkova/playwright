// import { test, expect } from "../../fixtures/pages-fixture.ts";
// import { headings } from "../../app/modules/core/support/data.ts";
// import { newWindowsContent } from "../../app/modules/alerts-and-iframes/support/data.ts";

// test.describe("New Tabs And Windows", async () => {
//   test.beforeEach(async ({ windowsPage }) => {
//     await windowsPage.visit();
//   });

//   test("@smoke A User Should Land To The Correct Page", async ({
//     windowsPage,
//   }) => {
//     test.step("Step 1: The Page Should Have The Correct Heading", async () => {
//       await windowsPage.heading.hasText(
//         windowsPage.mainHeading(),
//         headings.windows
//       );
//     });

//     test.step("Step 2: All Buttons Should Be Visible", async () => {
//       await windowsPage.buttons.isVisible(windowsPage.button("tab"));
//       await windowsPage.buttons.isVisible(windowsPage.button("window"));
//       await windowsPage.buttons.isVisible(windowsPage.button("messageWindow"));
//     });
//   });

//   test("@functional The Button 'New Tab' Should Open A New Tab", async ({
//     windowsPage,
//   }) => {
//     const newPage = await windowsPage.openNewTab(windowsPage.button("tab"));
//     await expect(newPage.locator("h1")).toHaveText(newWindowsContent.title);
//     await newPage.close();
//   });

//   test("@functional The Button 'New Window' Should Open New Window", async ({
//     windowsPage,
//   }) => {
//     const childPage = await windowsPage.openPopup(windowsPage.button("window"));
//     await expect(childPage.locator("h1")).toHaveText(newWindowsContent.title);
//     await childPage.close();
//   });

//   test("@functional The Button 'New Window Message' Should Open New Window With A Message", async ({
//     windowsPage,
//   }) => {
//     const windowMsg = await windowsPage.openPopup(
//       windowsPage.button("messageWindow")
//     );
//     await expect(windowMsg.locator("body")).toContainText(
//       newWindowsContent.message
//     );
//   });
// });
