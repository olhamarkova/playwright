import { type Page, expect, Locator } from "@playwright/test";
import BasePage from "../../core/base-page";
import {
  Table,
  Button,
  Input,
  Selector,
  Text,
} from "../../../components/support/component-service";
import { AddNewRecordForm } from "../../../components/custom/add-new-record-form";

export class WebTablesPage extends BasePage {
  public readonly addRecordForm: AddNewRecordForm;
  private readonly button: Button;
  private readonly table: Table;
  private readonly input: Input;
  private readonly selector: Selector;
  private readonly text: Text;

  private readonly rows: Locator;
  private readonly addRecordButton: Locator;
  private readonly searchField: Locator;
  private readonly rowsSelector: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.addRecordForm = new AddNewRecordForm(this.page);
    this.table = new Table(this.page);
    this.button = new Button(this.page);
    this.input = new Input(this.page);
    this.selector = new Selector(this.page);
    this.text = new Text(this.page);

    this.rows = this.table.rows();
    this.addRecordButton = this.button.getByName("Add");
    this.searchField = this.input.getByPlaceholder("Type to search");
    this.rowsSelector = this.selector.getByAriaLabel("rows per page");
  }

  private getSalaryCell(rowNumber: number) {
    return this.table.cellByCoordinates(rowNumber, 4);
  }

  actionButton(name: "edit" | "delete", rowNumber: number): Locator {
    return this.button.getByLocator(`#${name}-record-${rowNumber}`);
  }

  async openForm(): Promise<void> {
    await this.button.click(this.addRecordButton);
  }

  async openEditForm(rowNumber: number): Promise<void> {
    await this.button.click(this.actionButton("edit", rowNumber));
  }

  async deleteRow(rowNumber: number): Promise<void> {
    await this.button.click(this.actionButton("delete", rowNumber));
  }

  async changeRowsCount(count: number): Promise<void> {
    await this.selector.chooseOption(this.rowsSelector, `${count}`);
  }

  async sortColumn(columnName: string): Promise<void> {
    await this.button.click(this.table.columnHeader(columnName));
  }

  async search(searchTerm: string): Promise<void> {
    await this.input.fillOut(this.searchField, searchTerm);
  }

  async getSalaries(numberOfRows: number): Promise<string[]> {
    let salaries: string[] = [];
    for (let i = 1; i <= numberOfRows; i++) {
      let salary = await this.table.getContent(this.getSalaryCell(i));
      salaries.push(salary as string);
    }
    return salaries;
  }

  async verifySorted(data: string[], isAscending = true): Promise<void> {
    for (let i = 2; i < data.length; i++) {
      isAscending
        ? expect(Number(data[i])).toBeGreaterThan(Number(data[i - 1]))
        : expect(Number(data[i])).toBeLessThan(Number(data[i - 1]));
    }
  }

  async verifyRowsCount(count: number): Promise<void> {
    await this.table.hasCount(this.rows, count + 1); //table header is also counted
  }

  async verifyCellByContent(text: string, isVisible = true): Promise<void> {
    await this.table.isVisible(this.table.cellByContent(text), isVisible);
  }

  async verifyRow(rowNumber: number, text: string[]): Promise<void> {
    for (let i = 0; i < text.length; i++)
      await this.table.isVisible(
        this.table.cellByRowNumber(rowNumber, text[i])
      );
  }

  async verifyMessage(text: string): Promise<void> {
    await this.text.isVisible(this.text.getByText(text));
  }
}
