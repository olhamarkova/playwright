import { test } from "../../fixtures/pages-fixture.ts";
import { navigationItems, urls } from "../../app/modules/core/support/data.ts";
import { ElementsNavbar } from "../../app/components/support/types/navbar.ts";

test.describe("Navigation Tests", () => {
  test.beforeEach(async ({ app: { elements } }) => {
    await elements.visit();
  });

  test("@smoke The Navbar Should Contain All The Expected Categories", async ({
    app: { elements },
  }) => {
    await test.step("Step 1: Verify Elements Subcategories", async () => {
      await elements.verifyCallToAction();
      await elements.navbar.verifySubCategories(navigationItems.elements);
    });

    await test.step("Step 2: Verify Forms Subcategories", async () => {
      await elements.navbar.openCategory("Forms");
      await elements.navbar.verifySubCategories(navigationItems.forms);
    });

    await test.step("Step 3: Verify Alert, Frame & Windows Subcategories", async () => {
      await elements.navbar.openCategory("Alerts, Frame & Windows");
      await elements.navbar.verifySubCategories(navigationItems.alerts);
    });

    await test.step("Step 4: Verify Widgets Subcategories", async () => {
      await elements.navbar.openCategory("Widgets");
      await elements.navbar.verifySubCategories(navigationItems.widgets);
    });

    await test.step("Step 5: Verify Interactions Subcategories", async () => {
      await elements.navbar.openCategory("Interactions");
      await elements.navbar.verifySubCategories(navigationItems.interactions);
    });

    await test.step("Step 6: Verify Book Store Application Subcategories", async () => {
      await elements.navbar.openCategory("Book Store Application");
      await elements.navbar.verifySubCategories(
        navigationItems.bookStoreApplication
      );
      await elements.verifyUrl(urls.subCategories.books.bookStoreApi);
    });
  });

  test("@smoke Elements Navbar Subitems Should Lead To Corresponding Pages", async ({
    app: { elements },
  }) => {
    const url = Object.values(urls.subCategories.elements);
    let step = 1;

    for (let i = 0; i < url.length; i++) {
      await test.step(`Step ${step}: Check The Page ${navigationItems.elements[i]} Link`, async () => {
        await elements.navbar.openSubCategory(
          navigationItems.elements[i] as ElementsNavbar
        );
        await elements.verifyUrl(url[i]);

        step++;
      });
    }
  });
});
