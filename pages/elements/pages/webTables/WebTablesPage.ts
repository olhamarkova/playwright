import { type Page, Locator } from "@playwright/test";
import { InnerPage } from "../../../core/InnerPage";
import AddNewRecordForm from "./AddNewRecordForm";

export class WebTablesPage extends InnerPage {
  readonly addNewRecord: AddNewRecordForm;
  readonly rows: Locator;
  readonly addNewRecordButton: Locator;
  readonly searchField: Locator;
  readonly previousButton: Locator;
  readonly nextButton: Locator;
  readonly rowsSelector: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.addNewRecord = new AddNewRecordForm(page);
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

  async validateElements(elementNames: string[]) {
    for (let i = 0; i < elementNames.length; i++) {
      await this.validateElementVisibility(this.columnHeader(elementNames[i]));
    }
  }
}

//div[role='row']
//div[role='row'] .nth() [role='gridcell'] .nth()
//#delete-record-2 number eqls row number

/**
 * cases:
 * - add record and check result
 * - change count of rows
 * - edit record
 * - delete record
 * - find record positive
 * - find record negative
 */
