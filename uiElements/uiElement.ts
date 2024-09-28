import { Locator, Page, expect } from "@playwright/test";

export class UiElement {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getLocator(selector: string) {
    return this.page.locator(selector);
  }

  async isVisible(element: Locator | string) {
    await expect(element as Locator).toBeVisible();
  }

  async isEnabled<T extends string | Locator>(element: T, isEnabled = true) {
    if (!isEnabled) {
      await expect(element as Locator).toBeDisabled();
    } else {
      await expect(element as Locator).toBeEnabled();
    }
  }
}
