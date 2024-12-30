import { Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { GetByRoleOptions } from "./support/types/options";

export class Table extends Component {
  constructor(page: Page) {
    super(page);
  }

  rows(): Locator {
    return this.page.getByRole("row");
  }

  getRowByIndex(index: number, options?: GetByRoleOptions): Locator {
    return this.page.getByRole("row", options).nth(index - 1);
  }

  getCellByContent(content: string): Locator {
    return this.page.getByRole("gridcell", { name: content, exact: true });
  }

  getCellByRowNumber(index: number, content: string): Locator {
    return this.getRowByIndex(index).getByRole("gridcell", {
      name: content,
      exact: true,
    });
  }

  getColumnheader(columnName: string, options?: GetByRoleOptions): Locator {
    return this.page
      .getByRole("columnheader", options)
      .filter({ hasText: columnName });
  }
}
