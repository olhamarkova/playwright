//Form on the Web Tables Page

import { Locator, type Page } from "@playwright/test";
import { AddRecordInputs } from "../modules/elementsPages/support/types";
import { Form, Modal } from "./support/uiService";

export default class AddNewRecordForm extends Form {
  readonly modal: Modal;

  readonly modalTitle: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.modal = new Modal(this.page);

    this.modalTitle = this.modal.getById("registration-form-modal");
    this.submitButton = this.button.getByName("Submit");
  }

  formInput<T extends AddRecordInputs>(id: T): Locator {
    return this.input.getById(`${id}`);
  }

  async fillForm(data: Record<AddRecordInputs, string>): Promise<void> {
    for (const [key, value] of Object.entries(data) as [
      AddRecordInputs,
      string
    ][]) {
      await this.input.fillOut(this.formInput(key), value);
      await this.input.hasValue(this.formInput(key), value);
    }
  }
}
