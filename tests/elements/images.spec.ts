import { test } from "../../fixtures/pages-fixture.ts";
import {
  linksText,
  subHeadingsText,
} from "../../app/modules/elements/support/data.ts";
import { headings } from "../../app/modules/core/support/data.ts";

test.describe("Images And Links Page Tests", () => {
  test.beforeEach(async ({ imagesPage }) => {
    await imagesPage.visit();
  });

  test("@smoke The Images And Links Page Should Have All The Expected Elements", async ({
    imagesPage,
  }) => {
    await test.step("Step 1: Check The Page Headings", async () => {
      await imagesPage.heading.hasText(
        imagesPage.mainHeading(),
        headings.images
      );
      for (let i = 0; i < subHeadingsText.length; i++) {
        await imagesPage.text.isVisible(
          imagesPage.text.getByText(subHeadingsText[i])
        );
      }
    });

    await test.step("Step 2: Check The Links", async () => {
      await imagesPage.link.isVisible(
        imagesPage.link.getByText(linksText.valid)
      );
      await imagesPage.link.isVisible(
        imagesPage.link.getByText(linksText.broken)
      );
    });

    await test.step("Step 3: Check The Images", async () => {
      await imagesPage.image.isVisible(imagesPage.validImage);
      await imagesPage.image.isVisible(imagesPage.brokenImage); //pass though image is broken
    });
  });

  test("@negative Validate Images", async ({ imagesPage }) => {
    await test.step("Step 1: Find the broken image", async () => {
      await imagesPage.findBrokenImage();
    });
  });

  test("@negative Validate Links", async ({ imagesPage }) => {
    await test.step("Step 1: Find The Broken Link", async () => {
      await imagesPage.findBrokenLink();
    });
  });
});
