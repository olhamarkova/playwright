import { test } from "@playwright/test";
import {
  categoryUrls,
  subCategoriesUrls,
  sidebarItems,
} from "../../utils/services/dataService.ts";
import { ElementsPage } from "../../pages/elementsPages/pages/ElementsPage.ts";

let elements: ElementsPage;

test.beforeEach(async ({ page }) => {
  elements = new ElementsPage(page, categoryUrls.elements);
  await elements.visit();
});

test.describe("Left Panel(Sidebar) Tests", () => {
  test("@smoke The Sidebar Should Contain All The Expected Items", async () => {
    await test.step("Step 1: Check Elements Subcategories", async () => {
      await elements.navbar.validateMenuItems(sidebarItems.elements);
    });

    await test.step("Step 2: Check Forms Subcategories", async () => {
      await elements.navbar.clickElement(elements.navbar.getMenuItem("Forms"));
      await elements.navbar.validateMenuItems(sidebarItems.forms);
    });

    await test.step("Step 3: Check Alert, Frame & Windows Subcategories", async () => {
      await elements.navbar.clickElement(
        elements.navbar.getMenuItem("Alerts, Frame & Windows")
      );
      await elements.navbar.validateMenuItems(sidebarItems.alerts);
    });

    await test.step("Step 4: Check Widgets Subcategories", async () => {
      await elements.navbar.clickElement(
        elements.navbar.getMenuItem("Widgets")
      );
      await elements.navbar.validateMenuItems(sidebarItems.widgets);
    });

    await test.step("Step 5: Check Interactions Subcategories", async () => {
      await elements.navbar.clickElement(
        elements.navbar.getMenuItem("Interactions")
      );
      await elements.navbar.validateMenuItems(sidebarItems.interactions);
    });

    await test.step("Step 6: Check Book Store Application Subcategories", async () => {
      await elements.navbar.clickElement(
        elements.navbar.getMenuItem("Book Store Application")
      );
      await elements.navbar.validateMenuItems(
        sidebarItems.bookStoreApplication
      );
      await elements.hasUrl(subCategoriesUrls.books.bookStoreApi);
    });
  });
});
