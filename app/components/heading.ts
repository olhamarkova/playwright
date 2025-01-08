import { expect, Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { Textual } from "./support/interfaces/interfaces";
import { GetLocatorOptions, TextOptions } from "./support/types/options";
import { Headings } from "../modules/core/support/types";

export class Heading extends Component implements Textual {
  constructor(page: Page) {
    super(page);
  }

  getByText(text: string): Locator {
    return this.page.getByRole("heading").getByText(text, { exact: true });
  }

  getHeading(heading: Headings, options?: GetLocatorOptions): Locator {
    return this.getByLocator(heading, options);
  }

  async containText(
    element: Locator,
    text: string,
    options?: TextOptions
  ): Promise<void> {
    await expect(element).toContainText(text, options);
  }
}
