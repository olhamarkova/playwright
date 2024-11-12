import { test } from "@playwright/test";
import { subCategoriesUrls } from "../../modules/core/support/data.ts";
import { title } from "../../modules/core/support/data.ts";
import {
  elementPagesHeadings as headings,
  linkNames,
  requestLinks,
  subHeadings,
} from "../../modules/elementsPages/support/data.ts";
import { LinksPage } from "../../modules/elementsPages/pages/LinksPage.ts";

let linksPage: LinksPage;

test.beforeEach(async ({ page }) => {
  linksPage = new LinksPage(page, subCategoriesUrls.elements.links);
  await linksPage.visit();
});

test.describe("Links Page Tests", () => {
  test("@smoke The Links Page Should Have All The Expected Elements", async () => {
    await test.step("Step 1: Check The Page Headings", async () => {
      await linksPage.heading.hasText(
        linksPage.heading.getHeading("h1"),
        headings.links
      );
      await linksPage.heading.isElementVisible(
        linksPage.heading.getHeading("h5", { hasText: subHeadings[0] })
      );
      await linksPage.heading.isElementVisible(
        linksPage.heading.getHeading("h5", { hasText: subHeadings[1] })
      );
    });

    await test.step("Step 2: Check The Links", async () => {
      await linksPage.validateElementsByName(linkNames);
      await linksPage.link.isElementVisible(linksPage.dynamicLink);
      await linksPage.link.hasCount(linksPage.links, 9);
    });
  });

  test("@functional User Shall Have The Ability To Send Requests By Clicking The Links", async ({
    context,
    page,
  }) => {
    await test.step("Step 1: Validate 'Home' Link", async () => {
      await linksPage.openNewTab(context, linksPage.link.getByName("Home"));
      await linksPage.hasTitle(title.mainTitle);
      await page.bringToFront();
    });

    await test.step("Step 2: Validate 'Home' Dynamic Link", async () => {
      await linksPage.openNewTab(context, linksPage.dynamicLink);
      await linksPage.hasTitle(title.mainTitle);
      await page.bringToFront();
    });

    await test.step("Step 3: Validate 'Created' Link", async () => {
      await linksPage.validateLinkResponse(requestLinks.created, 201);
    });

    await test.step("Step 4: Validate 'No Content' Link", async () => {
      await linksPage.validateLinkResponse(requestLinks.noContent, 204);
    });

    await test.step("Step 5: Validate 'Moved Permanently' Link", async () => {
      await linksPage.validateLinkResponse(requestLinks.moved, 301);
    });

    await test.step("Step 6: Validate 'Bad Request' Link", async () => {
      await linksPage.validateLinkResponse(requestLinks.badRequest, 400);
    });

    await test.step("Step 7: Validate 'Unauthorized' Link", async () => {
      await linksPage.validateLinkResponse(requestLinks.unauthorized, 401);
    });

    await test.step("Step 8: Validate 'Forbidden' Link", async () => {
      await linksPage.validateLinkResponse(requestLinks.forbidden, 403);
    });

    await test.step("Step 9: Validate 'Not Found' Link", async () => {
      await linksPage.validateLinkResponse(requestLinks.notFound, 404);
    });
  });
});
