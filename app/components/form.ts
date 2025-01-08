import { Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { Button, Input, Heading } from "./support/component-service";
import { Writable } from "./support/interfaces/interfaces";

export class Form extends Component implements Partial<Writable> {
  public readonly button: Button;
  public readonly input: Input;
  public readonly heading: Heading;

  constructor(page: Page) {
    super(page);
    this.button = new Button(this.page);
    this.input = new Input(this.page);
    this.heading = new Heading(this.page);
  }

  async clear(input: Locator): Promise<void> {
    await this.input.clear(input);
  }

  async verifyInputValue(input: Locator, value: string): Promise<void> {
    await this.input.hasValue(input, value);
  }

  async enterValue(input: Locator, value: string): Promise<void> {
    await this.input.fillOut(input, value);
  }

  async submit(button: Locator): Promise<void> {
    await this.button.click(button);
  }
}
