import { test } from "@playwright/test";
import { subCategoriesUrls } from "../../app/modules/core/support/data.ts";
import {
  elementPagesHeadings as headings,
  linksText,
  subHeadingsText,
} from "../../app/modules/elementsPages/support/data.ts";
import { ImagesPage } from "../../app/modules/elementsPages/pages/ImagesPage.ts";

let imagesPage: ImagesPage;

test.beforeEach(async ({ page }) => {
  imagesPage = new ImagesPage(page, subCategoriesUrls.elements.brokenLinks);
  await imagesPage.visit();
});

test.describe("Images And Links Page Tests", () => {
  test("@smoke The Images And Links Page Should Have All The Expected Elements", async () => {
    await test.step("Step 1: Check The Page Headings", async () => {
      await imagesPage.heading.hasText(
        imagesPage.pageTitle("h1"),
        headings.images
      );
      for (let i = 0; i < subHeadingsText.length; i++) {
        await imagesPage.text.isElementVisible(
          imagesPage.text.getByText(subHeadingsText[i])
        );
      }
    });

    await test.step("Step 2: Check The Links", async () => {
      await imagesPage.link.isElementVisible(
        imagesPage.link.getByText(linksText.valid)
      );
      await imagesPage.link.isElementVisible(
        imagesPage.link.getByText(linksText.broken)
      );
    });

    await test.step("Step 3: Check The Images", async () => {
      await imagesPage.image.isElementVisible(imagesPage.validImage);
      await imagesPage.image.isElementVisible(imagesPage.brokenImage); //pass though image is broken
    });
  });

  test("@negative Validate Images", async () => {
    await test.step("Step 1: Find the broken image", async () => {
      await imagesPage.findBrokenImage();
    });
  });

  test("@negative Validate Links", async () => {
    await test.step("Step 1: Find The Broken Link", async () => {
      await imagesPage.findBrokenLink();
    });
  });
});
