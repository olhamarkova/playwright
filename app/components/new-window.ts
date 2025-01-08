import { Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { GetLocatorOptions } from "./support/types/options";
import { Text, Heading } from "./support/component-service";
import { Textual } from "./support/interfaces/interfaces";

export class NewWindow extends Component implements Partial<Textual> {
  readonly text: Text;
  readonly title: Heading;

  constructor(page: Page) {
    super(page);
    this.text = new Text(this.page);
    this.title = new Heading(this.page);
  }

  heading(options?: GetLocatorOptions): Locator {
    return this.title.getHeading("h1", options);
  }

  async close(): Promise<void> {
    await this.page.close();
  }
}
