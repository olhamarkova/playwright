import { Locator, Page, expect } from "@playwright/test";
import { ClickOptions, GetLocatorOptions } from "../support/types/options.ts";
import { Clickable } from "../support/interfaces/interfaces.ts";

export class Component implements Clickable {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //Locators
  getByLocator(locator: string, options?: GetLocatorOptions): Locator {
    return this.page.locator(locator, options);
  }

  getById(id: string): Locator {
    return this.page.locator(`#${id}`);
  }

  getByLabel(label: string): Locator {
    return this.page.getByLabel(label, { exact: true });
  }

  getLabel(elementName: string): Locator {
    return this.page.locator(`label[for='${elementName}']`);
  }

  getByTitle(title: string, isExact: boolean): Locator {
    return this.page.getByTitle(title, { exact: isExact });
  }

  getByText(text: string): Locator {
    return this.page.getByText(text, { exact: true });
  }

  getByClass(className: string): Locator {
    return this.page.locator(`.${className}`);
  }

  //Actions
  async click(element: Locator, options?: ClickOptions): Promise<void> {
    await element.click(options);
  }

  async dbClick(element: Locator, options?: ClickOptions): Promise<void> {
    await element.dblclick(options);
  }

  //Assertions
  async isVisible(element: Locator, isVisible = true): Promise<void> {
    await expect(element).toBeVisible({ visible: isVisible });
  }

  async isEnabled(element: Locator, isEnabled = true): Promise<void> {
    isEnabled
      ? await expect(element).toBeEnabled()
      : await expect(element).toBeDisabled();
  }

  async hasCount(element: Locator, count: number): Promise<void> {
    await expect(element).toHaveCount(count);
  }

  async hasClass(element: Locator, className: string): Promise<void> {
    await expect(element).toHaveClass(className);
  }

  async hasAttribute(element: Locator, attribute: string): Promise<void> {
    await expect(element).toHaveAttribute(attribute);
  }

  async hasCSS(
    element: Locator,
    css: { property: string; value: string }
  ): Promise<void> {
    await expect(element).toHaveCSS(css.property, css.value);
  }

  /**
   * Check the visibility of group of elements by locator
   * @param elements - locator that returns a group of similar elements (i.e., all buttons on the page)
   */
  async areVisible(elements: Locator): Promise<void> {
    for (let i = 0; i < (await elements.count()); i++) {
      this.isVisible(elements.nth(i));
    }
  }
}
