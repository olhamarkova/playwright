import { test } from "@playwright/test";
import { subCategoriesUrls } from "../../utils/services/dataService.ts";
import {
  elementPagesHeadings as headings,
  linksText,
  subHeadingsText,
} from "../../pages/elements/elementsData.ts";
import { ImagesPage } from "../../pages/elements/pages/ImagesPage.ts";

let imagesPage: ImagesPage;

test.beforeEach(async ({ page }) => {
  imagesPage = new ImagesPage(page, subCategoriesUrls.elements.brokenLinks);
  await imagesPage.visit();
});

test.describe("Images And Links Page Tests", () => {
  test("@smoke The Images And Links Page Should Have All The Expected Elements", async () => {
    await test.step("Step 1: Check The Page Headings", async () => {
      await imagesPage.validateHeading(headings.images);
      for (let i = 0; i < subHeadingsText.length; i++) {
        await imagesPage.validateTextElement(subHeadingsText[i]);
      }
    });

    await test.step("Step 2: Check The Links", async () => {
      await imagesPage.validateElementVisibility(
        imagesPage.link(linksText.valid)
      );
      await imagesPage.validateElementVisibility(
        imagesPage.link(linksText.broken)
      );
    });

    await test.step("Step 3: Check The Images", async () => {
      await imagesPage.validateElementVisibility(imagesPage.validImage);
      await imagesPage.validateElementVisibility(imagesPage.brokenImage); //pass though image is broken
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
