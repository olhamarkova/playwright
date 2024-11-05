import { Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { GetByRoleOptions, GetLocatorOptions } from "../utils/types/Options";

export class Table extends UiElement {
  constructor(page: Page) {
    super(page);
  }

  getTable(): Locator {
    return this.page.getByRole("table");
  }

  getRows() {
    return this.page.getByRole("row");
  }

  getRow(index: number, options?: GetByRoleOptions): Locator {
    return this.page.getByRole("row", options).nth(index - 1);
  }

  getCellByRowNumber(
    rowNumber: number,
    columnNumber: number,
    options?: GetByRoleOptions
  ): Locator {
    return this.getRow(rowNumber)
      .getByRole("gridcell", options)
      .nth(columnNumber - 1);
  }

  getCellByContent(options: GetLocatorOptions): Locator {
    return this.page.getByRole("cell").filter(options);
  }

  getColumnheader(columnName: string, options?: GetByRoleOptions): Locator {
    return this.page
      .getByRole("columnheader", options)
      .filter({ hasText: columnName });
  }
}
