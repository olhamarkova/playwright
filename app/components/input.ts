import { expect, Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { Writable } from "./support/interfaces/interfaces";

export class Input extends Component implements Writable {
  constructor(page: Page) {
    super(page);
  }

  getByPlaceholder(placeholder: string, isExact: boolean = true): Locator {
    return this.page.getByPlaceholder(placeholder, { exact: isExact });
  }

  getTextareaById(id: string): Locator {
    return this.page.locator(`textarea[id='${id}']`);
  }

  async fillOut(element: Locator, value: string): Promise<void> {
    await element.fill(value);
  }

  async fillOutSequentially(element: Locator, value: string): Promise<void> {
    await element.pressSequentially(value);
  }

  async clear(input: Locator): Promise<void> {
    await input.clear();
  }

  async isEditable(input: Locator): Promise<void> {
    await expect(input).toBeEditable();
  }

  async isEmpty(input: Locator): Promise<void> {
    await expect(input).toBeEmpty();
  }

  async hasValue(input: Locator, value: string): Promise<void> {
    await expect(input).toHaveValue(value);
  }

  async hasPlaceholder(input: Locator, placeholder: string): Promise<void> {
    await expect(input).toHaveAttribute("placeholder", placeholder);
  }
}
