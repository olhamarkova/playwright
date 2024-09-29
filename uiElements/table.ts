import { Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { Clickable } from "../utils/interfaces/clickable";

export class Table extends UiElement implements Partial<Clickable> {
  constructor(page: Page) {
    super(page);
  }

  getRow(index: number, options?: {}): Locator {
    return this.page.getByRole("row", options).nth(index - 1);
  }

  getCell(options?: {}): Locator {
    return this.page.getByRole("cell", options);
  }

  getColumnheader(options?: {}): Locator {
    return this.page.getByRole("columnheader", options);
  }

  async clickElement(options?: {}): Promise<void> {
    await this.getCell(options).click(options);
  }
}
