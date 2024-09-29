import { expect, Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { Textual } from "../utils/interfaces/textual";

export class Heading extends UiElement implements Textual {
  constructor(page: Page) {
    super(page);
  }

  getByText(text: string, options?: {}): Locator {
    return this.page.getByRole("heading").getByText(text, options);
  }

  getHeading(
    heading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
    options?: {}
  ): Locator {
    return this.page.getByRole("heading", options).locator(heading);
  }

  async hasText(
    element: Locator | string,
    text: string,
    options?: {}
  ): Promise<void> {
    await expect(element as Locator).toHaveText(text, options);
  }

  async containText(
    element: Locator | string,
    text: string,
    options: {}
  ): Promise<void> {
    await expect(element as Locator).toContainText(text, options);
  }
}
