import { test } from "../../fixtures/pagesFixture.ts";
import { ElementsMenuSubItems } from "../../app/components/support/types/NavbarTypes.ts";
import {
  title,
  sidebarItems,
  subCategoriesUrls,
} from "../../app/modules/core/support/data.ts";
import { callToAction } from "../../app/modules/elementsPages/support/data.ts";

test.describe("Elements Page Tests", () => {
  test.beforeEach(async ({ elementsPage }) => {
    await elementsPage.visit();
  });

  test("@smoke The Elements Page Should Have All The Expected Elements", async ({
    elementsPage,
  }) => {
    await test.step("Step 1: Check The Elements Page Title", async () => {
      await elementsPage.hasTitle(title.mainTitle);
    });

    await test.step("Step 2: The Page Should Have A Call To Action", async () => {
      await elementsPage.text.isElementVisible(
        elementsPage.text.getByText(callToAction)
      );
    });
  });

  test("@smoke The Elements Menu Subitems Should Lead To Corresponding Pages", async ({
    elementsPage,
  }) => {
    const url = Object.values(subCategoriesUrls.elements);
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
