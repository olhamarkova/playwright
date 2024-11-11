import { Locator, type Page } from "@playwright/test";
import { AddRecordInputs } from "../../../../utils/types/ElementsTypes";
import { Form, Modal } from "../../../../utils/services/uiService";

export default class AddNewRecordForm extends Form {
  readonly modal: Modal;

  readonly addRecordForm: Locator;
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
}
