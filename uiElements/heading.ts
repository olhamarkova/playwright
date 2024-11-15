import { expect, Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { Textual } from "./support/interfaces/textual";
import { GetLocatorOptions, TextOptions } from "./support/types/OptionsTypes";

export class Heading extends UiElement implements Textual {
  constructor(page: Page) {
    super(page);
  }

  getByText(text: string, isExact: boolean = true): Locator {
    return this.page.getByRole("heading").getByText(text, { exact: isExact });
  }

  getHeading(
    heading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
    options?: GetLocatorOptions
  ): Locator {
    return this.getLocator(heading, options);
  }

  async hasText(
    element: Locator | string,
    text: string | string[],
    options?: TextOptions
  ): Promise<void> {
    await expect(element as Locator).toHaveText(text, options);
  }

  async containText(
    element: Locator | string,
    text: string,
    options?: TextOptions
  ): Promise<void> {
    await expect(element as Locator).toContainText(text, options);
  }
}
