// import { test, expect } from "../../fixtures/pages-fixture.ts";
// import { title, headings } from "../../app/modules/core/support/data.ts";
// import {
//   anchors,
//   requestLinks,
//   subHeadings,
// } from "../../app/modules/elements/support/data.ts";

// test.describe("Links Page Tests", () => {
//   test.beforeEach(async ({ linksPage }) => {
//     await linksPage.visit();
//   });

//   test("@smoke The Links Page Should Have All The Expected Elements", async ({
//     linksPage,
//   }) => {
//     await test.step("Step 1: Check The Page Headings", async () => {
//       await linksPage.heading.hasText(linksPage.mainHeading(), headings.links);
//       await linksPage.heading.hasText(
//         linksPage.heading.getHeading("h5"),
//         subHeadings
//       );
//     });

//     await test.step("Step 2: Check The Links", async () => {
//       await linksPage.link.validateByAnchors(anchors);
//       await linksPage.link.isVisible(linksPage.dynamicLink);
//       await linksPage.link.hasCount(linksPage.links, 9);
//     });
//   });

//   test("@functional User Shall Have The Ability To Open New Tabs Clicking The 'Home' Links", async ({
//     linksPage,
//   }) => {
//     await test.step("Step 1: Validate 'Home' Link", async () => {
//       const newPage = await linksPage.openNewTab(
//         linksPage.link.getByName("Home")
//       );
//       await expect(newPage).toHaveTitle(title.mainTitle);
//       await linksPage.bringToFront();
//     });

//     await test.step("Step 2: Validate 'Home' Dynamic Link", async () => {
//       const newPage = await linksPage.openNewTab(linksPage.dynamicLink);
//       await expect(newPage).toHaveTitle(title.mainTitle);
//       await linksPage.bringToFront();
//     });
//   });

//   test("@functional User Shall Have The Ability To Send Requests Clicking The Links", async ({
//     linksPage,
//   }) => {
//     const linksData = Object.values(requestLinks);
//     for (const link of linksData) {
//       await linksPage.validateLinkResponse(link.link, link.code);
//     }
//   });
// });
