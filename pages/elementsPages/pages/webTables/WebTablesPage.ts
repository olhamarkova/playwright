// import { type Page, expect, Locator } from "@playwright/test";
// import BasePage from "../../../core/BasePage";
// import { Table } from "../../../../uiElements/table";
// import { Button } from "../../../../uiElements/button";
// import { Input } from "../../../../uiElements/input";
// import AddNewRecordForm from "./AddNewRecordForm";
// import { UiElement } from "../../../../uiElements/uiElement";

// export class WebTablesPage extends BasePage {
//   readonly addNewRecord: AddNewRecordForm;
//   readonly rows: Locator;
//   readonly addNewRecordButton: Locator;
//   readonly searchField: Locator;
//   readonly previousButton: Locator;
//   readonly nextButton: Locator;
//   readonly rowsSelector: Locator;
//   readonly table: Table;

//   constructor(page: Page, url: string) {
//     super(page, url);
//     this.addNewRecord = new AddNewRecordForm(this.page);
//     this.table = new Table(this.page);
//     this.rows = this.table.getRows();
//     this.addNewRecordButton = new Button(this.page).getButton("Add");
//     this.searchField = new Input(this.page).getByPlaceholder("Type to search");
//     this.previousButton = new Button(this.page).getButton("Previous");
//     this.nextButton = new Button(this.page).getButton("Next");
//     this.rowsSelector = new UiElement(this.page).getLocator(
//       "select[aria-label='rows per page']"
//     );
//   }

//   actionButton(name: "edit" | "delete", recordNumber: number) {
//     return new Button(this.page).getLocator(`#${name}-record-${recordNumber}`);
//   }

//   async fillForm(data: object) {
//     for (let [key, value] of Object.entries(data)) {
//       await new Input(this.page).fillOut(this.addNewRecord.input(key), value);
//       await new Input(this.page).hasValue(this.addNewRecord.input(key), value);
//     }
//   }

//   async validateElementsByName(elementNames: string[]) {
//     for (let i = 0; i < elementNames.length; i++) {
//       await this.table.isElVisible(this.table.getColumnheader(elementNames[i]));
//     }
//   }

//   async validateCellContent(
//     rowNumber: number,
//     columnNumber: number,
//     text?: string
//   ) {
//     if (!text) {
//       await expect(this.table.getCell(rowNumber, columnNumber)).toBeEmpty();
//     } else
//       await expect(this.table.getCell(rowNumber, columnNumber)).toHaveText(
//         text!
//       );
//   }

//   async validateRowContent(rowNumber: number, text?: string) {
//     for (let i = 0; i < 7; i++) {
//       await this.validateCellContent(rowNumber, i, text);
//     }
//   }
// }
