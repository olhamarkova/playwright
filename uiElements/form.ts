import { Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { Writable } from "./../utils/interfaces/writable";
import { GetByRoleOptions } from "./support/OptionsTypes";
import { Button, Input, Heading } from "./support/uiService";

export class Form extends UiElement implements Partial<Writable> {
  readonly button: Button;
  readonly input: Input;
  readonly heading: Heading;

  constructor(page: Page) {
    super(page);
    this.button = new Button(this.page);
    this.input = new Input(this.page);
    this.heading = new Heading(this.page);
  }

  getForm(options?: GetByRoleOptions): Locator {
    return this.page.getByRole("form", options);
  }

  /**
   * Fiil a form inputs with provided data
   * @param element should be the locator that returns group of elements (all inputs on the form)
   * @param value an array with string values
   */
  async fillOut(element: Locator, value: string[]): Promise<void> {
    for (let i = 0; i < value.length; i++) {
      await element.nth(i).fill(value[i]);
    }
  }
}
