import { Locator, type Page } from "@playwright/test";

export default class AddNewRecordForm {
  protected page: Page;
  readonly modal: Locator;
  readonly modalTitle: Locator;
  readonly form: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = this.page.locator("modal-content");
    this.modalTitle = this.page.locator(".h4");
    this.form = this.page.locator("#userForm");
    this.submitButton = this.page.locator("#submit");
  }

  input(id: string) {
    return this.page.locator(`#${id}`);
  }
}
