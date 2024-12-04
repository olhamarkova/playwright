import { Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import {
  GetByRoleOptions,
  GetLocatorOptions,
} from "./support/types/OptionsTypes";

export class Table extends Component {
  constructor(page: Page) {
    super(page);
  }

  getTable(): Locator {
    return this.page.getByRole("table");
  }

  getRows(): Locator {
    return this.page.getByRole("row");
  }

  getRowByIndex(index: number, options?: GetByRoleOptions): Locator {
    return this.page.getByRole("row", options).nth(index - 1);
  }

  getCellByRowNumber(
    rowNumber: number,
    columnNumber: number,
    options?: GetByRoleOptions
  ): Locator {
    return this.getRowByIndex(rowNumber)
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
