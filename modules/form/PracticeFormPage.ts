import { type Locator, type Page } from "@playwright/test";
import {
  Form,
  Radio,
  Checkbox,
  Selector,
  Datepicker,
  Filechooser,
  Chicklet,
} from "../../uiElements/support/uiService";
import BasePage from "../core/BasePage";
import { FormInputIds, Genders } from "./support/types";

export class PracticeFormPage extends BasePage {
  readonly form: Form;
  readonly radio: Radio;
  readonly checkbox: Checkbox;
  readonly selector: Selector;
  readonly datepicker: Datepicker;
  readonly filechooser: Filechooser;
  readonly chicklet: Chicklet;

  readonly formTitle: Locator;
  readonly addressTextArea: Locator;
  readonly subjectInput: Locator;
  readonly subjectLabel: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.form = new Form(this.page);
    this.radio = new Radio(this.page);
    this.checkbox = new Checkbox(this.page);
    this.selector = new Selector(this.page);
    this.datepicker = new Datepicker(this.page);
    this.filechooser = new Filechooser(this.page);
    this.chicklet = new Chicklet(this.page);

    this.formTitle = this.heading.getByClass("practice-form-wrapper h5");
    this.addressTextArea = this.form.input.getTextAreaById("currentAddress");
    this.subjectInput = this.form.input.getByClass(
      "subjects-auto-complete__value-container"
    );
    this.subjectLabel = this.chicklet.getByClass(
      "subjects-auto-complete__multi-value__label"
    );
  }

  formInputs(inputId: FormInputIds): Locator {
    return this.form.input.getById(inputId);
  }

  genderRadio(gender: Genders) {
    return this.radio.getLabel(`gender-radio-${gender}`);
  }

  hobbiesCheckbox(hobby: string) {
    return this.checkbox.getById(`hobbies-checkbox-${hobby}`);
  }

  stateAndCitySelector(selectorId: "state" | "city") {
    return this.selector.getById(selectorId);
  }
}
