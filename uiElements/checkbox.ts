import { expect, Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { Checkable } from "../utils/interfaces/checkable";
import { Clickable } from "../utils/interfaces/clickable";

export class Checkbox
  extends UiElement
  implements Checkable, Partial<Clickable>
{
  constructor(page: Page) {
    super(page);
  }

  getByType() {
    return this.page.locator("input[type='checkbox']");
  }

  getCheckbox(options?: {}): Locator {
    return this.page.getByRole("checkbox", options);
  }

  async clickElement(element: Locator | string, options?: {}): Promise<void> {
    await (element as Locator).click(options);
  }

  async check(element: Locator | string, options?: {}): Promise<void> {
    await (element as Locator).check(options);
  }

  async uncheck(element: Locator | string, options?: {}): Promise<void> {
    await (element as Locator).uncheck(options);
  }

  async isChecked(
    element: Locator | string,
    isChecked: boolean
  ): Promise<void> {
    if (!isChecked) {
      await expect(element as Locator).not.toBeChecked();
    } else {
      await expect(element as Locator).toBeChecked();
    }
  }
}
