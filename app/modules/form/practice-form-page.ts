import { type Locator, type Page } from "@playwright/test";
import {
  Form,
  Radio,
  Checkbox,
  Selector,
  Datepicker,
  Filechooser,
  Chicklet,
} from "../../components/support/component-service";
import BasePage from "../core/base-page";
import { FormInputIds, Genders, Hobbies } from "./support/types";
import { ResultsModal } from "../../components/custom/form-results-modal";
import { formTitle } from "./support/data";
import { Days, Month } from "../../components/support/types/datepicker";

export class PracticeFormPage extends BasePage {
  readonly form: Form;
  readonly radio: Radio;
  readonly checkbox: Checkbox;
  readonly selector: Selector;
  readonly datepicker: Datepicker;
  readonly filechooser: Filechooser;
  readonly chicklet: Chicklet;
  readonly resultsModal: ResultsModal;

  readonly formTitle: Locator;
  readonly addressTextArea: Locator;
  readonly subjectInput: Locator;
  readonly subjectLabel: Locator;
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
    this.resultsModal = new ResultsModal(this.page);

    this.formTitle = this.heading.getByClass("practice-form-wrapper h5");
    this.subjectInput = this.form.input.getByClass(
      "subjects-auto-complete__value-container"
    );
    this.subjectLabel = this.chicklet.getByClass(
      "subjects-auto-complete__multi-value__label"
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

  stateSelector(selectorId: "state" | "city") {
    return this.selector.getById(selectorId);
  }

  async openDatepicker(): Promise<void> {
    await this.form.click(this.formInputs("dateOfBirthInput"));
  }

  async verifyCalendarOpened(): Promise<void> {
    await this.datepicker.isVisible(this.datepicker.getDatepicker());
  }

  async setDateOfBirth(year: string, month: Month, day: Days): Promise<void> {
    await this.datepicker.chooseYear(year);
    await this.datepicker.chooseMonth(month);
    await this.datepicker.chooseDayByNumber(day);
  }

  async enterData(inputId: FormInputIds, data: string): Promise<void> {
    await this.form.enterValue(this.formInputs(inputId), data);
  }

  async verifyFormTitle(): Promise<void> {
    await this.heading.hasText(this.formTitle, formTitle);
  }
}
