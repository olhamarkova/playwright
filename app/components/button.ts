import { Locator, Page, expect } from "@playwright/test";
import { Clickable } from "./support/interfaces/clickable";
import { UiElement } from "./core/component";
import { TextOptions } from "./support/types/OptionsTypes";

export class Button extends UiElement implements Clickable {
  constructor(page: Page) {
    super(page);
  }

  getButton(name: string): Locator {
    return this.page.getByRole("button", { name: name, exact: true });
  }

  getSubmitButton(): Locator {
    return this.page.locator("button[type='submit']");
  }

  async hasText(
    element: Locator,
    text: string | string[],
    options?: TextOptions
  ): Promise<void> {
    await expect(element as Locator).toHaveText(text, options);
  }
}
