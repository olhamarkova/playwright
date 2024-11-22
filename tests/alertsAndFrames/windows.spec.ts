import {
  newWindowsContent,
  pageTitles,
} from "../../app/modules/alertsAndFrames/support/data";
import { test, expect } from "../../fixtures/pagesFixture";

test.describe.serial("New Tabs And Windows", async () => {
  test.beforeEach(async ({ windowsPage }) => {
    await windowsPage.visit();
  });

  test("@smoke A User Should Land To The Correct Page", async ({
    windowsPage,
  }) => {
    test.step("Step 1: The Page Should Have The Correct Heading", async () => {
      await windowsPage.heading.hasText(
        windowsPage.pageTitle("h1"),
        pageTitles.windows
      );
    });

    test.step("Step 2: All Buttons Should Be Visible", async () => {
      await windowsPage.button.isElementVisible(windowsPage.newTabButton);
      await windowsPage.button.isElementVisible(windowsPage.newWindowButton);
      await windowsPage.button.isElementVisible(windowsPage.newWindowMsgButton);
    });
  });

  test("@functional The Button 'New Tab' Should Open A New Tab", async ({
    windowsPage,
    context,
  }) => {
    const newPage = await windowsPage.openNewTab(
      context,
      windowsPage.newTabButton
    );
    await expect(newPage.locator("h1")).toHaveText("This is a sample page");
    await newPage.close();
  });

  test("@functional The Button 'New Window' Should Open New Window", async ({
    windowsPage,
  }) => {
    const childPage = await windowsPage.openPopup(windowsPage.newWindowButton);
    await expect(childPage.locator("h1")).toHaveText("This is a sample page");
    await childPage.close();
  });

  test("@functional The Button 'New Window Message' Should Open New Window With A Message", async ({
    windowsPage,
  }) => {
    const windowMsg = await windowsPage.openPopup(
      windowsPage.newWindowMsgButton
    );
    await expect(windowMsg.locator("body")).toContainText(
      newWindowsContent.message
    );
  });
});
