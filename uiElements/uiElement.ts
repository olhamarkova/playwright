import { Locator, Page, expect } from "@playwright/test";
import { GetLocatorOptions } from "../utils/types/Options";

export class UiElement {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getLocator(selector: string, options?: GetLocatorOptions): Locator {
    return this.page.locator(selector, options);
  }

  getById(id: string): Locator {
    return this.page.locator(`#${id}`);
  }

  getByLabel(label: string): Locator {
    return this.page.getByLabel(label, { exact: true });
  }

  getElByTitle(title: string, options?: { exact?: boolean }): Locator {
    return this.page.getByTitle(title, options);
  }

  async isElVisible(element: Locator | string): Promise<void> {
    await expect(element as Locator).toBeVisible();
  }

  async isElEnabled<T extends string | Locator>(
    element: T,
    isEnabled = true
  ): Promise<void> {
    if (!isEnabled) {
      await expect(element as Locator).toBeDisabled();
    } else {
      await expect(element as Locator).toBeEnabled();
    }
  }

  async hasCount(element: Locator, count: number): Promise<void> {
    await expect(element).toHaveCount(count);
  }

  async hasClass(element: Locator, className: string): Promise<void> {
    await expect(element).toHaveClass(className);
  }

  async hasAttribute(element: Locator, attribute: string) {
    await expect(element).toHaveAttribute(attribute);
  }
}
