import { test, expect } from "@playwright/test";
import { subCategoriesUrls, title } from "../../utils/services/dataService.ts";
import {
  elementPagesHeadings as headings,
  linkNames,
  linksText,
  requestLinks,
  subHeadings,
  subHeadingsText,
} from "../../pages/elements/elementsData.ts";
import { ImagesPage } from "../../pages/elements/pages/ImagesPage.ts";

let imagesPage: ImagesPage;

test.beforeEach(async ({ page }) => {
  imagesPage = new ImagesPage(page, subCategoriesUrls.elements.brokenLinks);
  await imagesPage.visit();
});

test.describe("Links Page Tests", () => {
  test("@smoke The Images And Links Page Should Have All The Expected Elements", async ({
    page,
  }) => {
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

  test("@smoke Find the broken image", async ({ page }) => {
    await test.step("Step 1: Find the broken image", async () => {
      const images = page.locator("div#app img");
      const allImages = await images.all();
      for await (const image of allImages) {
        const imageSrc = await image.getAttribute("src");
        expect.soft(imageSrc?.length).toBeGreaterThan(1);
        //@ts-ignore
        if (imageSrc?.length > 0) {
          const response = await page.request.get(
            `https://demoqa.com${imageSrc}`
          );
          expect.soft(response.status()).toBe(200);
          await page.goto(`https://demoqa.com${imageSrc}`);
          await expect.soft(page.locator(`img`)).toBeVisible();
          const title = await page.title();
          if (title === "DEMOQA") {
            throw new Error("Here is a broken image");
          }
          await page.goBack();
        }
      }
    });
  });
});
