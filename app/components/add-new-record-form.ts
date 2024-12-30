//Form on the Web Tables Page

import { Locator, type Page } from "@playwright/test";
import { AddRecordInputs } from "../modules/elements/support/types";
import { Form, Modal } from "./support/component-service";

export class AddNewRecordForm extends Form {
  readonly modal: Modal;

  readonly modalTitle: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.modal = new Modal(this.page);

    this.modalTitle = this.modal.getById("registration-form-modal");
    this.submitButton = this.button.getByName("Submit");
  }

  formInput(id: AddRecordInputs): Locator {
    return this.input.getById(`${id}`);
  }

  async verifyOpened(): Promise<void> {
    await this.heading.hasText(this.modalTitle, "Registration Form");
  }

  async clearInput<T>(input: T): Promise<void> {
    await this.input.clear(this.formInput(input as AddRecordInputs));
  }

  async enterValue<T>(input: T, value: string): Promise<void> {
    await this.input.fillOut(this.formInput(input as AddRecordInputs), value);
  }

  async submit(): Promise<void> {
    await this.button.click(this.submitButton);
  }

  async verifyInputValue<T>(input: T, value: string): Promise<void> {
    await this.input.hasValue(this.formInput(input as AddRecordInputs), value);
  }

  async fillForm(data: Record<AddRecordInputs, string>): Promise<void> {
    for (const [key, value] of Object.entries(data) as [
      AddRecordInputs,
      string
    ][]) {
      await this.enterValue(this.formInput(key), value);
      await this.verifyInputValue(this.formInput(key), value);
    }
  }
}
