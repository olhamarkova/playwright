import { Locator, type Page } from "@playwright/test";
import { AddRecordInputs } from "../../../../utils/types/ElementsTypes";
import { Form } from "../../../../uiElements/form";
import { Button } from "../../../../uiElements/button";
import { Heading } from "../../../../uiElements/heading";
import { Modal } from "../../../../uiElements/modal";
import { Input } from "../../../../uiElements/input";

export default class AddNewRecordForm {
  protected page: Page;
  readonly modal: Locator;
  readonly modalTitle: Locator;
  readonly form: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = new Modal(this.page).getModal();
    this.modalTitle = new Heading(this.page).getHeading("h4");
    this.form = new Form(this.page).getForm();
    this.submitButton = new Button(this.page).getButton("Submit");
  }

  input(id: AddRecordInputs | string) {
    return new Input(this.page).getLocator(`#${id}`);
  }
}
