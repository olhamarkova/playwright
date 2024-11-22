import { type Locator, type Page } from "@playwright/test";
import {
  Form,
  Radio,
  Checkbox,
  Selector,
  Datepicker,
  Filechooser,
  Chicklet,
  Modal,
  Table,
} from "../../components/support/uiService";
import BasePage from "../core/BasePage";
import { FormInputIds, Genders, Hobbies } from "./support/types";

export class PracticeFormPage extends BasePage {
  readonly form: Form;
  readonly radio: Radio;
  readonly checkbox: Checkbox;
  readonly selector: Selector;
  readonly datepicker: Datepicker;
  readonly filechooser: Filechooser;
  readonly chicklet: Chicklet;
  readonly resultsModal: Modal;
  readonly resultsTable: Table;

  readonly formTitle: Locator;
  readonly addressTextArea: Locator;
  readonly subjectInput: Locator;
  readonly subjectLabel: Locator;
  readonly resultsModalHeading: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.form = new Form(this.page);
    this.radio = new Radio(this.page);
    this.checkbox = new Checkbox(this.page);
    this.selector = new Selector(this.page);
    this.datepicker = new Datepicker(this.page);
    this.filechooser = new Filechooser(this.page);
    this.chicklet = new Chicklet(this.page);
    this.resultsModal = new Modal(this.page);
    this.resultsTable = new Table(this.page);

    this.formTitle = this.heading.getByClass("practice-form-wrapper h5");
    this.addressTextArea = this.form.input.getTextAreaById("currentAddress");
    this.subjectInput = this.form.input.getByClass(
      "subjects-auto-complete__value-container"
    );
    this.subjectLabel = this.chicklet.getByClass(
      "subjects-auto-complete__multi-value__label"
    );
    this.resultsModalHeading = this.resultsModal.getById(
      "example-modal-sizes-title-lg"
    );
    this.submitBtn = this.form.button.getByType("submit");
  }

  formInputs(inputId: FormInputIds): Locator {
    return this.form.input.getById(inputId);
  }

  genderRadio(gender: Genders) {
    return this.radio.getLabel(`gender-radio-${gender}`);
  }

  hobbiesCheckbox(hobby: Hobbies) {
    return this.checkbox.getById(`hobbies-checkbox-${hobby}`);
  }

  stateAndCitySelector(selectorId: "state" | "city") {
    return this.selector.getById(selectorId);
  }

  getResultsTableCell(rowNumber: number, cellContent: string) {
    return this.resultsTable.getLocator(
      `//table//tr[${rowNumber}]/td[contains(.,"${cellContent}")]`
    );
  }

  /**
   * Ensures that every row contains correct columns and data
   */
  async validateResultsTable(studentInfo: Map<string, string>) {
    let rowNumber = 1;

    for (const [label, value] of studentInfo.entries()) {
      const isLabelValid = await this.getResultsTableCell(
        rowNumber,
        label
      ).isVisible();
      if (isLabelValid) {
        await this.resultsTable.isElementVisible(
          this.getResultsTableCell(rowNumber, value)
        );
      }

      rowNumber++;
    }
  }

  //'Close' button is covered by advertisement and Playwright's force click doesn't work here.
  async closeModal() {
    await this.page.evaluate(async () => {
      const closeButton = document.getElementById("closeLargeModal");
      if (!closeButton) {
        throw new Error("Such a button does not exist!");
      } else {
        closeButton!.click();
      }
    });
  }
}
