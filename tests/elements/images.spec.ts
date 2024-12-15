import { test } from "../../fixtures/pages-fixture.ts";
import { linksText } from "../../app/modules/elements/support/data.ts";

test.describe("Images And Links Page Tests", () => {
  test.beforeEach(async ({ app: { images }, heading }) => {
    await images.visit();
    await images.verifyHeading(heading.images);
  });

  test("@smoke The Images And Links Page Should Have All The Expected Elements", async ({
    app: { images },
  }) => {
    await test.step("Step 1: Verify Page Headings", async () => {
      await images.verifySubHeadings();
    });

    await test.step("Step 2: Verify Links", async () => {
      await images.verifyLinkVisible(linksText.valid);
      await images.verifyLinkVisible(linksText.broken);
    });

    await test.step("Step 3: Verify Images", async () => {
      await images.verifyImageVisible("valid");
      await images.verifyImageVisible("broken");
    });
  });

  test("@negative Verify Images: Find the broken image", async ({
    app: { images },
  }) => {
    await images.findBrokenImage();
  });

  test("@negative Verify Links: Find The Broken Link", async ({
    app: { images },
  }) => {
    await images.findBrokenLink();
  });
});
