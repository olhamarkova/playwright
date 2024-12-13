import { type Locator, type Page } from "@playwright/test";
import BasePage from "../../core/BasePage";
import {
  Button,
  Checkbox,
} from "../../../components/support/component-service";
import { Folders, ToggleLabel } from "../support/types";
import { halfCheckedBox } from "../support/classes";

export class CheckBoxPage extends BasePage {
  readonly button: Button;
  readonly checkbox: Checkbox;
  private readonly checkboxes: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);
    this.checkbox = new Checkbox(this.page);

    this.checkboxes = this.checkbox.getByType();
  }

  private expandButton(buttonName: "Expand" | "Collapse"): Locator {
    return this.button.getByLabel(`${buttonName} all`);
  }

  private checkboxLabel(folder: Folders): Locator {
    return this.checkbox.getByLocator("label").filter({ hasText: folder });
  }

  private getCheckbox(folder: Folders): Locator {
    return this.checkboxLabel(folder).locator("svg").nth(0);
  }

  private toggleButton(label: ToggleLabel): Locator {
    return this.button.getByLocator(
      `//span[contains(text(), '${label}')]/parent::label/preceding-sibling::button[@title='Toggle']`
    );
  }

  async clickToggle(label: ToggleLabel): Promise<void> {
    await this.button.click(this.toggleButton(label));
  }

  async selectFolder(folder: Folders): Promise<void> {
    await this.checkbox.click(this.checkboxLabel(folder));
  }

  async collapseFolders() {
    await this.button.click(this.expandButton("Collapse"));
  }

  async expandFolders() {
    await this.button.click(this.expandButton("Expand"));
  }

  async verifyCheckboxVisible(folder: Folders): Promise<void> {
    await this.checkbox.isVisible(this.getCheckbox(folder));
  }

  async verifyButtonVisible(button: "Collapse" | "Expand"): Promise<void> {
    await this.button.isVisible(this.expandButton(button));
  }

  async verifyChecked(folder: Folders, checked: boolean = true): Promise<void> {
    await this.checkbox.isChecked(this.getCheckbox(folder), checked);
  }

  async verifyAreChecked(checked: boolean = true): Promise<void> {
    for (let i = 0; i < (await this.checkboxes.count()); i++)
      await this.checkbox.isChecked(this.checkboxes.nth(i), checked);
  }

  async verifyCheckboxesCount(count: number): Promise<void> {
    await this.checkbox.hasCount(this.checkboxes, count);
  }

  async verifyHalfChecked(): Promise<void> {
    const parentCategories = [
      Folders.Workspace,
      Folders.Documents,
      Folders.Home,
    ];
    for (let i = 0; i < parentCategories.length; i++) {
      await this.checkbox.hasClass(
        this.getCheckbox(parentCategories[i]),
        halfCheckedBox
      );
    }
  }
}
