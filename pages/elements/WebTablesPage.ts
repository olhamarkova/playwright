import { type Page, Locator } from "@playwright/test";
import { InnerPage } from "../core/InnerPage";

export class WebTablesPage extends InnerPage {
  readonly rows: Locator;
  readonly addNewRecordButton: Locator;
  readonly searchField: Locator;
  readonly previousButton: Locator;
  readonly nextButton: Locator;
  readonly rowsSelector: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.rows = this.page.locator("div[role='row']");
    this.addNewRecordButton = this.page.locator("#addNewRecordButton");
    this.searchField = this.page.getByPlaceholder("Type to search");
    this.previousButton = this.page.getByRole("button", {
      name: "Previous",
      exact: true,
    }); //refactor
    this.nextButton = this.page.getByRole("button", {
      name: "Next",
      exact: true,
    });
    this.rowsSelector = this.page.locator("select[aria-label='rows per page']");
  }

  columnHeader(columnName: string) {
    return this.page
      .locator("div[role='columnheader'] div.rt-resizable-header-content")
      .filter({ hasText: columnName });
  }
}

//div[role='row']
//div[role='row'] .nth() [role='gridcell'] .nth()
//#delete-record-2 number eqls row number

/**
 * cases:
 * - smoke - table has 11 rows, buttons, search, heading etc
 * - add record and check result
 * - change count of rows
 * - edit record
 * - delete record
 * - find record positive
 * - find record negative
 * - resize???
 */
