import { type Page, expect, Locator } from "@playwright/test";
import BasePage from "../../core/BasePage";
import {
  Table,
  Button,
  Input,
  Selector,
  Text,
} from "../../../components/support/component-service";
import { AddNewRecordForm } from "../../../components/add-new-record-form";

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

  actionButton(name: "edit" | "delete", rowNumber: number): Locator {
    return this.button.getByLocator(`#${name}-record-${rowNumber}`);
  }

  async openForm(): Promise<void> {
    await this.button.click(this.addNewRecordButton);
  }

  async openEditForm(rowNumber: number): Promise<void> {
    await this.button.click(this.actionButton("edit", rowNumber));
  }

  async changeRowsCount(count: number): Promise<void> {
    await this.selector.chooseOption(this.rowsSelector, `${count}`);
  }

  async verifyRowsCount(count: number): Promise<void> {
    await this.table.hasCount(this.rows, count + 1); //table header also included
  }

  async verifyColumnHeaders(elementNames: string[]): Promise<void> {
    for (let i = 0; i < elementNames.length; i++) {
      await this.table.isVisible(this.table.getColumnheader(elementNames[i]));
    }
  }

  async verifyCellByContent(text: string): Promise<void> {
    await this.table.isVisible(this.table.getCellByContent(text));
  }

  async verifyRow(rowNumber: number, text: string[]): Promise<void> {
    for (let i = 0; i < text.length; i++)
      await this.table.isVisible(
        this.table.getCellByRowNumber(rowNumber, text[i])
      );
  }
}
