import { test } from "../../fixtures/pagesFixture.ts";
import { sidebarItems, pageUrls } from "../../app/modules/core/support/data.ts";
import { ElementsMenuSubItems } from "../../app/components/support/types/navbar.ts";

test.describe("Navigation Tests", () => {
  test.beforeEach(async ({ elementsPage }) => {
    await elementsPage.visit();
  });

  test("@smoke The Navbar Should Contain All The Expected Items", async ({
    elementsPage,
  }) => {
    await test.step("Step 1: Check Elements Subcategories", async () => {
      await elementsPage.navbar.validateMenuItems(sidebarItems.elements);
    });

    await test.step("Step 2: Check Forms Subcategories", async () => {
      await elementsPage.navbar.clickElement(
        elementsPage.navbar.getMenuItem("Forms")
      );
      await elementsPage.navbar.validateMenuItems(sidebarItems.forms);
    });

    await test.step("Step 3: Check Alert, Frame & Windows Subcategories", async () => {
      await elementsPage.navbar.clickElement(
        elementsPage.navbar.getMenuItem("Alerts, Frame & Windows")
      );
      await elementsPage.navbar.validateMenuItems(sidebarItems.alerts);
    });

    await test.step("Step 4: Check Widgets Subcategories", async () => {
      await elementsPage.navbar.clickElement(
        elementsPage.navbar.getMenuItem("Widgets")
      );
      await elementsPage.navbar.validateMenuItems(sidebarItems.widgets);
    });

    await test.step("Step 5: Check Interactions Subcategories", async () => {
      await elementsPage.navbar.clickElement(
        elementsPage.navbar.getMenuItem("Interactions")
      );
      await elementsPage.navbar.validateMenuItems(sidebarItems.interactions);
    });

    await test.step("Step 6: Check Book Store Application Subcategories", async () => {
      await elementsPage.navbar.clickElement(
        elementsPage.navbar.getMenuItem("Book Store Application")
      );
      await elementsPage.navbar.validateMenuItems(
        sidebarItems.bookStoreApplication
      );
      await elementsPage.hasUrl(pageUrls.subCategories.books.bookStoreApi);
    });
  });

  test("@smoke Navbar Subitems Should Lead To Corresponding Pages", async ({
    elementsPage,
  }) => {
    const url = Object.values(pageUrls.subCategories.elements);
    let step = 1;

    for (let i = 0; i < url.length; i++) {
      await test.step(`Step ${step}: Check The Page ${sidebarItems.elements[i]} Link`, async () => {
        await elementsPage.navbar.clickElement(
          elementsPage.navbar.menuSubItem(
            sidebarItems.elements[i] as ElementsMenuSubItems
          )
        );
        await elementsPage.hasUrl(url[i]);

        step++;
      });
    }
  });
});
