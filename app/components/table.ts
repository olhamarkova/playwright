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

  rowByNumber(rowNumber: number, options?: GetByRoleOptions): Locator {
    return this.page.getByRole("row", options).nth(rowNumber - 1);
  }

  cellByContent(content: string): Locator {
    return this.page.getByRole("gridcell", { name: content, exact: true });
  }

  cellByRowNumber(index: number, content: string): Locator {
    return this.rowByNumber(index).getByRole("gridcell", {
      name: content,
      exact: true,
    });
  }

  cellByCoordinates(rowNumber: number, cellNumber: number): Locator {
    return this.rowByNumber(rowNumber).getByRole("gridcell").nth(cellNumber);
  }

  columnHeader(columnName: string, options?: GetByRoleOptions): Locator {
    return this.page
      .getByRole("columnheader", options)
      .filter({ hasText: columnName });
  }
}
