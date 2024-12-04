import { Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { Writable } from "./support/interfaces/interfaces";
import { Button, Input, Heading } from "./support/uiService";

export class Form extends Component implements Partial<Writable> {
  readonly button: Button;
  readonly input: Input;
  readonly heading: Heading;

  constructor(page: Page) {
    super(page);
    this.button = new Button(this.page);
    this.input = new Input(this.page);
    this.heading = new Heading(this.page);
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
