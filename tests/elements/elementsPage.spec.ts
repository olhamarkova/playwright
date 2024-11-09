import { test } from "@playwright/test";
import { ElementsPage } from "../../pages/elementsPages/pages/ElementsPage.ts";
import { ElementsMenuSubItems } from "../../utils/types/NavbarTypes.ts";
import {
  copyRightText,
  title,
  categoryUrls,
  subCategoriesUrls,
  sidebarItems,
} from "../../utils/services/dataService.ts";
import { callToAction } from "../../data/elementsData.ts";

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
