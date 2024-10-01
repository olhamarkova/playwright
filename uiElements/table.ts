import { Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { Clickable } from "../utils/interfaces/clickable";

export class Table extends UiElement implements Partial<Clickable> {
  constructor(page: Page) {
    super(page);
  }

  getTable(): Locator {
    return this.page.getByRole("table");
  }

  getRows() {
    return this.page.getByRole("row");
  }

  getRow(index: number, options?: {}): Locator {
    return this.page.getByRole("row", options).nth(index - 1);
  }

  getCellByRowNumber(
    rowNumber: number,
    columnNumber: number,
    options?: {}
  ): Locator {
    return this.getRow(rowNumber - 1)
      .getByRole("gridcell", options)
      .nth(columnNumber - 1);
  }

  getCellByContent(options: {}): Locator {
    return this.page.getByRole("cell").filter(options);
  }

  getColumnheader(columnName: string, options?: {}): Locator {
    return this.page
      .getByRole("columnheader", options)
      .filter({ hasText: columnName });
  }

  async clickElement(element: Locator, options?: {}): Promise<void> {
    await element.click(options);
  }
}
