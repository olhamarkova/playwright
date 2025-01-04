import { test } from "../../fixtures/pages-fixture.ts";

test.describe("New Tabs And Windows", async () => {
  test.beforeEach(async ({ app: { windows }, heading }) => {
    await windows.visit();
    await windows.verifyHeading(heading.windows);
  });

  test("@functional The Button 'New Tab' Should Open A New Tab", async ({
    app: { windows },
  }) => {
    const newPage = await windows.getNewTab();
    await windows.verifyNewTabOpened(newPage);
    await windows.closeTab(newPage);
  });

  test("@functional The Button 'New Window' Should Open New Window", async ({
    app: { windows },
  }) => {
    const childPage = await windows.getNewPage("window");
    await windows.verifyNewTabOpened(childPage);
    await windows.closeTab(childPage);
  });

  test("@functional The Button 'New Window Message' Should Open New Window With A Message", async ({
    app: { windows },
  }) => {
    const windowMsg = await windows.getNewPage("messageWindow");
    await windows.verifyPopupMsg(windowMsg);
  });
});
