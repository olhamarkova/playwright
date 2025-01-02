//Form on the Web Tables Page

import { Locator, type Page } from "@playwright/test";
import { AddRecordInputs } from "../../modules/elements/support/types";
import { Form, Modal } from "../support/component-service";
import { Writable } from "../support/interfaces/interfaces";

export class AddNewRecordForm extends Form implements Partial<Writable> {
  private readonly modal: Modal;

  private readonly modalTitle: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.modal = new Modal(this.page);

    this.modalTitle = this.modal.getById("registration-form-modal");
    this.submitButton = this.button.getByName("Submit");
  }

  private formInput(id: AddRecordInputs): Locator {
    return this.input.getById(`${id}`);
  }

  async verifyOpened(): Promise<void> {
    await this.heading.hasText(this.modalTitle, "Registration Form");
  }

  async clearInput(input: AddRecordInputs): Promise<void> {
    await this.clear(this.formInput(input));
  }

  async fill(input: AddRecordInputs, value: string): Promise<void> {
    await this.enterValue(this.formInput(input), value);
  }

  async submitForm(): Promise<void> {
    await this.submit(this.submitButton);
  }

  async verifyValue(input: AddRecordInputs, value: string): Promise<void> {
    await this.verifyInputValue(this.formInput(input), value);
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
