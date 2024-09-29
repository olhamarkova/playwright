import { Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { Writable } from "./../utils/interfaces/writable";

export class Form extends UiElement implements Partial<Writable> {
  constructor(page: Page) {
    super(page);
  }

  getForm(options?: {}): Locator {
    return this.page.getByRole("form", options);
  }

  /**
   * Fiil a form inputs with provided data
   * @param element should be the locator that returns group of elements
   * @param value an array with string values
   */
  async fillOut(element: Locator, value: string[]): Promise<void> {
    for (let i = 0; i < value.length; i++) {
      await element.nth(i).fill(value[i]);
    }
  }
}
