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
    this.submitButton = this.button.getButton("Submit");
  }

  formInput(id: AddRecordInputs | string): Locator {
    return this.input.getById(`${id}`);
  }

  async fillForm(data: object): Promise<void> {
    for (let [key, value] of Object.entries(data)) {
      await this.input.fillOut(this.formInput(key), value);
      await this.input.hasValue(this.formInput(key), value);
    }
  }
}
