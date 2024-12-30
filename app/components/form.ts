import { Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { Button, Input, Heading } from "./support/component-service";

export class Form extends Component {
  readonly button: Button;
  readonly input: Input;
  readonly heading: Heading;

  constructor(page: Page) {
    super(page);
    this.button = new Button(this.page);
    this.input = new Input(this.page);
    this.heading = new Heading(this.page);
  }

  async clearInput<T>(input: T): Promise<void> {
    await this.input.clear(input as Locator);
  }

  async verifyInputValue<T>(input: T, value: string): Promise<void> {
    await this.input.hasValue(input as Locator, value);
  }

  async enterValue<T>(input: T, value: string): Promise<void> {
    await this.input.fillOut(input as Locator, value);
  }
}
