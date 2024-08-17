import { expect, test } from "@playwright/test";
import { subCategoriesUrls } from "../../utils/services/dataService.ts";
import {
  elementPagesHeadings as headings,
  linkNames,
  subHeadings,
  successMessages,
} from "../../pages/elements/elementsData.ts";
import { LinksPage } from "../../pages/elements/pages/LinksPage.ts";

let linksPage: LinksPage;

test.beforeEach(async ({ page }) => {
  linksPage = new LinksPage(page, subCategoriesUrls.elements.links);
  await linksPage.visit();
});

test.describe("Links Page Tests", () => {
  test("@smoke The Links Page Should Have All The Expected Elements", async ({
    page,
  }) => {
    await test.step("Step 1: Check The Page Headings", async () => {
      await linksPage.validateHeading(headings.links);
      await linksPage.validateTextElement(subHeadings[0]);
      await linksPage.validateTextElement(subHeadings[1]);
    });

    await test.step("Step 2: Check The Links", async () => {
      await linksPage.validateElementsByName(linkNames); //1 link has dynamic property - to solve
      await linksPage.validateElementsCount(linksPage.links, 9);
      const responsePromise = page.waitForResponse(
        (resp) =>
          resp.url().includes(`/created`) && resp.request().method() === "GET"
      );
      await linksPage.clickButton(linksPage.link(linkNames[1]));
      const resp = await responsePromise;
      expect(resp.status()).toBe(201);
      expect(resp.statusText()).toBe("Created");
    });
  });

  // test("@functional User Shall Have The Ability To Click The Buttons", async () => {
  //   await test.step("Step 1: ", async () => {});

  //   await test.step("Step 2: ", async () => {});

  //   await test.step("Step 3: ", async () => {});
  // });
});
