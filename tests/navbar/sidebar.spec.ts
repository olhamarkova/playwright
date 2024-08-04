import { test } from "@playwright/test";
import { qase } from "playwright-qase-reporter";
import { screenshot } from "../../utils/screenshot.ts";
import {
  categoryUrls,
  subCategoriesUrls,
  sidebarItems,
} from "../../utils/services/dataService.ts";
import { ElementsPage } from "../../pages/elements/ElementsPage.ts";
import LeftPannel from "../../pages/leftPanel/LeftPannel.ts";

let elements: ElementsPage;
let sidebar: LeftPannel;

test.beforeEach(async ({ page }) => {
  elements = new ElementsPage(page, categoryUrls.elements);
  sidebar = new LeftPannel(page);
  await elements.visit();
});

test.describe("Left Panel(Sidebar) Tests", () => {
  test("@smoke The Sidebar Should Contain All The Expected Items", async ({
    page,
  }) => {
    qase.id(18);
    qase.title(test.info().title);

    await test.step("Step 1: Check Elements Subcategories", async () => {
      await sidebar.validateMenuItems(sidebarItems.elements);

      await screenshot(page, test);
    });

    await test.step("Step 2: Check Forms Subcategories", async () => {
      await sidebar.openMenu("Forms");
      await sidebar.validateMenuItems(sidebarItems.forms);

      await screenshot(page, test);
    });

    await test.step("Step 3: Check Alert, Frame & Windows Subcategories", async () => {
      await sidebar.openMenu("Alerts, Frame & Windows");
      await sidebar.validateMenuItems(sidebarItems.alerts);

      await screenshot(page, test);
    });

    await test.step("Step 4: Check Widgets Subcategories", async () => {
      await sidebar.openMenu("Widgets");
      await sidebar.validateMenuItems(sidebarItems.widgets);

      await screenshot(page, test);
    });

    await test.step("Step 5: Check Interactions Subcategories", async () => {
      await sidebar.openMenu("Interactions");
      await sidebar.validateMenuItems(sidebarItems.interactions);

      await screenshot(page, test);
    });

    await test.step("Step 6: Check Book Store Application Subcategories", async () => {
      await sidebar.openMenu("Book Store Application");
      await sidebar.validateMenuItems(sidebarItems.bookStoreApplication);
      await elements.validatePageUrl(subCategoriesUrls.books.bookStoreApi);

      await screenshot(page, test);
    });
  });
});
