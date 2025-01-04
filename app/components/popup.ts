import { expect, Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { GetLocatorOptions, TextOptions } from "./support/types/options";
import { Button, Text, Heading } from "./support/component-service";
import { Textual } from "./support/interfaces/interfaces";

export class Popup extends Component implements Partial<Textual> {
  readonly button: Button;
  readonly text: Text;
  readonly title: Heading;

  constructor(page: Page) {
    super(page);
    this.button = new Button(this.page);
    this.text = new Text(this.page);
    this.title = new Heading(this.page);
  }

  body(options?: GetLocatorOptions): Locator {
    return this.page.locator("body", options);
  }

  async containText(
    element: Locator,
    text: string,
    options?: TextOptions
  ): Promise<void> {
    await expect(element).toContainText(text, options);
  }
}
