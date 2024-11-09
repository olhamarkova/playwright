import { Locator, Page, expect } from "@playwright/test";
import { ClickOptions, GetLocatorOptions } from "../utils/types/Options.ts";
import { Clickable } from "../utils/interfaces/clickable.ts";

export class UiElement implements Clickable {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //Locators
  getLocator(selector: string, options?: GetLocatorOptions): Locator {
    return this.page.locator(selector, options);
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

  getElByTitle(title: string, options?: { exact?: boolean }): Locator {
    return this.page.getByTitle(title, options);
  }

  //Actions
  async clickElement(
    element: Locator | string,
    options?: ClickOptions
  ): Promise<void> {
    await (element as Locator).click(options);
  }

  async dbClick(
    element: Locator | string,
    options?: ClickOptions
  ): Promise<void> {
    await (element as Locator).dblclick(options);
  }

  //Assertions
  async isElementVisible(element: Locator | string): Promise<void> {
    await expect(element as Locator).toBeVisible();
  }

  async isElementEnabled<T extends string | Locator>(
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

  async hasCSS(
    element: Locator | string,
    css: { property: string; value: string }
  ): Promise<void> {
    await expect(element as Locator).toHaveCSS(css.property, css.value);
  }

  /**
   * Check the visibility of group of elements by locator
   * @param elements - locator that returns a group of similar elements (i.e., all buttons on the page)
   */
  async areElementsVisible(elements: Locator): Promise<void> {
    for (let i = 0; i < (await elements.count()); i++) {
      this.isElementVisible(elements.nth(i));
    }
  }
}
