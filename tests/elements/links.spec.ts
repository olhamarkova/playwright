import { test } from "../../fixtures/pages-fixture.ts";
import { requestLinks } from "../../app/modules/elements/support/data.ts";

test.describe("Links Page Tests", () => {
  test.beforeEach(async ({ app: { links }, heading }) => {
    await links.visit();
    await links.verifyHeading(heading.links);
  });

  test("@smoke Verify The Page Headings", async ({ app: { links } }) => {
    await links.verifySubHeadings();
  });

  test("@functional User Shall Have The Ability To Open New Tabs Clicking The 'Home' Links", async ({
    app: { links },
  }) => {
    await test.step("Step 1: Verify 'Home' Link", async () => {
      await links.verifyNewTabOpened(links.homeLink);
      await links.bringToFront();
    });

    await test.step("Step 2: Verify 'Home' Dynamic Link", async () => {
      await links.verifyNewTabOpened(links.dynamicLink);
      await links.bringToFront();
    });
  });

  test("@functional User Shall Have The Ability To Send Requests Clicking The Links", async ({
    app: { links },
  }) => {
    const linksData = Object.values(requestLinks);
    for (const link of linksData) {
      await links.verifyLinkResponse(link.link, link.code);
    }
  });
});
