import { test } from "@playwright/test";
import { ElementsPage } from "../../modules/elementsPages/pages/ElementsPage.ts";
import { ElementsMenuSubItems } from "../../uiElements/support/types/NavbarTypes.ts";
import {
  categoryUrls,
  subCategoriesUrls,
} from "../../modules/core/support/data.ts";
import { title } from "../../modules/core/support/data.ts";
import { sidebarItems } from "../../modules/mainPage/support/categories.ts";
import { callToAction } from "../../modules/elementsPages/support/data.ts";

let elements: ElementsPage;

test.beforeEach(async ({ page }) => {
  elements = new ElementsPage(page, categoryUrls.elements);
  await elements.visit();
});

test.describe("Elements Page Tests", () => {
  test("@smoke The Elements Page Should Have All The Expected Elements", async () => {
    await test.step("Step 1: Check The Elements Page Title", async () => {
      await elements.hasTitle(title.mainTitle);
    });

    await test.step("Step 2: The Page Should Have A Call To Action", async () => {
      await elements.text.isElementVisible(
        elements.text.getByText(callToAction)
      );
    });
  });

  test("@smoke The Elements Menu Subitems Should Lead To Corresponding Pages", async () => {
    const url = Object.values(subCategoriesUrls.elements);
    let step = 1;

    for (let i = 0; i < url.length; i++) {
      await test.step(`Step ${step}: Check The Page ${sidebarItems.elements[i]} Link`, async () => {
        await elements.navbar.clickElement(
          elements.navbar.menuSubItem(
            sidebarItems.elements[i] as ElementsMenuSubItems
          )
        );
        await elements.hasUrl(url[i]);

        step++;
      });
    }
  });
});
