import { type Page, expect, Locator } from "@playwright/test";
import BasePage from "../../core/BasePage";
import {
  Table,
  Button,
  Input,
  Selector,
  Text,
} from "../../../components/support/component-service";
import AddNewRecordForm from "../../../components/add-new-record-form";

export class WebTablesPage extends BasePage {
  readonly addNewRecord: AddNewRecordForm;
  readonly button: Button;
  readonly table: Table;
  readonly input: Input;
  readonly selector: Selector;
  readonly text: Text;

  readonly rows: Locator;
  readonly addNewRecordButton: Locator;
  readonly searchField: Locator;
  readonly previousButton: Locator;
  readonly nextButton: Locator;
  readonly rowsSelector: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.addNewRecord = new AddNewRecordForm(this.page);
    this.table = new Table(this.page);
    this.button = new Button(this.page);
    this.input = new Input(this.page);
    this.selector = new Selector(this.page);
    this.text = new Text(this.page);

    this.rows = this.table.rows();
    this.addNewRecordButton = this.button.getByName("Add");
    this.searchField = this.input.getByPlaceholder("Type to search");
    this.previousButton = this.button.getByName("Previous");
    this.nextButton = this.button.getByName("Next");
    this.rowsSelector = this.selector.getByAriaLabel("rows per page");
  }

  actionButton(name: "edit" | "delete", recordNumber: number): Locator {
    return this.button.getByLocator(`#${name}-record-${recordNumber}`);
  }

  async validateElementsByName(elementNames: string[]): Promise<void> {
    for (let i = 0; i < elementNames.length; i++) {
      await this.table.isVisible(this.table.getColumnheader(elementNames[i]));
    }
  }

  async validateCell(
    rowNumber: number,
    columnNumber: number,
    text?: string
  ): Promise<void> {
    if (!text) {
      await expect(
        this.table.getCellByRowNumber(rowNumber, columnNumber)
      ).toBeEmpty();
    } else
      await expect(
        this.table.getCellByRowNumber(rowNumber, columnNumber)
      ).toHaveText(text!);
  }

  async validateRow(rowNumber: number, text?: string): Promise<void> {
    for (let i = 0; i < 7; i++) {
      await this.validateCell(rowNumber, i, text);
    }
  }
}
