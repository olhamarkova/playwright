import { expect, Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { Writable } from "../utils/interfaces/writable";

export class Input extends UiElement implements Writable {
  constructor(page: Page) {
    super(page);
  }

  getTextbox(options?: {}): Locator {
    return this.page.getByRole("textbox", options);
  }

  getByPlaceholder(placeholder: string, options?: {}): Locator {
    return this.page.getByPlaceholder(placeholder, options);
  }

  async fillOut(element: Locator | string, value: string): Promise<void> {
    await (element as Locator).fill(value);
  }

  async fillOutSequentially(
    element: Locator | string,
    value: string
  ): Promise<void> {
    await (element as Locator).pressSequentially(value);
  }

  async clear(input: Locator | string): Promise<void> {
    await (input as Locator).clear();
  }

  async isEditable(input: Locator | string): Promise<void> {
    await expect(input as Locator).toBeEditable();
  }

  async isEmpty(input: Locator | string): Promise<void> {
    await expect(input as Locator).toBeEmpty();
  }

  async hasValue(input: Locator | string, value: string): Promise<void> {
    await expect(input as Locator).toHaveValue(value);
  }

  async hasPlaceholder(
    input: Locator | string,
    placeholder: string
  ): Promise<void> {
    await expect(input as Locator).toHaveAttribute("placeholder", placeholder);
  }
}
