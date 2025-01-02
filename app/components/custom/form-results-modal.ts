//Modal on the Practice Form page

import { Page, Locator } from "@playwright/test";
import { Modal, Table } from "../support/component-service";

export class ResultsModal extends Modal {
  readonly table: Table;
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.table = new Table(this.page);
    this.heading = this.getById("example-modal-sizes-title-lg");
  }

  resultsTableCell(rowNumber: number, cellContent: string): Locator {
    return this.table.getByLocator(
      `//table//tr[${rowNumber}]/td[contains(.,"${cellContent}")]`
    );
  }

  /**
   * Ensures that every row contains correct columns and data
   */
  async verifyResultsTable(studentInfo: Map<string, string>): Promise<void> {
    let rowNumber = 1;

    for (const [label, value] of studentInfo.entries()) {
      await this.table.isVisible(this.resultsTableCell(rowNumber, value));
      rowNumber++;
    }
  }

  //'Close' button is covered by advertisement and Playwright's force click doesn't work here.
  async close(): Promise<void> {
    await this.page.evaluate(async () => {
      const closeButton = document.getElementById("closeLargeModal");
      if (!closeButton) {
        throw new Error("Such a button does not exist!");
      } else {
        closeButton!.click();
      }
    });
  }
}
