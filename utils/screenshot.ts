import { Page } from "@playwright/test";

export async function screenshot(page: Page, test: any) {
  await page.screenshot({
    path: `screenshots/${
      test.info()._steps[test.info()._steps.length - 1].title
    }.png`,
    fullPage: true,
  });
}
