// import { test } from "../../fixtures/pages-fixture.ts";
// import { navigationItems, urls } from "../../app/modules/core/support/data.ts";
// import { ElementsNavbar } from "../../app/components/support/types/navbar.ts";

// test.describe("Navigation Tests", () => {
//   test.beforeEach(async ({ elementsPage }) => {
//     await elementsPage.visit();
//   });

//   test("@smoke The Navbar Should Contain All The Expected Items", async ({
//     elementsPage,
//   }) => {
//     await test.step("Step 1: Check Elements Subitems", async () => {
//       await elementsPage.navbar.validateItems(navigationItems.elements);
//     });

//     await test.step("Step 2: Check Forms Subitems", async () => {
//       await elementsPage.navbar.click(elementsPage.navbar.item("Forms"));
//       await elementsPage.navbar.validateItems(navigationItems.forms);
//     });

//     await test.step("Step 3: Check Alert, Frame & Windows Subitems", async () => {
//       await elementsPage.navbar.click(
//         elementsPage.navbar.item("Alerts, Frame & Windows")
//       );
//       await elementsPage.navbar.validateItems(navigationItems.alerts);
//     });

//     await test.step("Step 4: Check Widgets Subitems", async () => {
//       await elementsPage.navbar.click(elementsPage.navbar.item("Widgets"));
//       await elementsPage.navbar.validateItems(navigationItems.widgets);
//     });

//     await test.step("Step 5: Check Interactions Subitems", async () => {
//       await elementsPage.navbar.click(elementsPage.navbar.item("Interactions"));
//       await elementsPage.navbar.validateItems(navigationItems.interactions);
//     });

//     await test.step("Step 6: Check Book Store Application Subitems", async () => {
//       await elementsPage.navbar.click(
//         elementsPage.navbar.item("Book Store Application")
//       );
//       await elementsPage.navbar.validateItems(
//         navigationItems.bookStoreApplication
//       );
//       await elementsPage.hasUrl(urls.subCategories.books.bookStoreApi);
//     });
//   });

//   test("@smoke Navbar Subitems Should Lead To Corresponding Pages", async ({
//     elementsPage,
//   }) => {
//     const url = Object.values(urls.subCategories.elements);
//     let step = 1;

//     for (let i = 0; i < url.length; i++) {
//       await test.step(`Step ${step}: Check The Page ${navigationItems.elements[i]} Link`, async () => {
//         await elementsPage.navbar.click(
//           elementsPage.navbar.subitem(
//             navigationItems.elements[i] as ElementsNavbar
//           )
//         );
//         await elementsPage.hasUrl(url[i]);

//         step++;
//       });
//     }
//   });
// });
