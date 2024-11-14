import { type Locator, type Page } from "@playwright/test";
import {
  Form,
  Radio,
  Checkbox,
  Selector,
  Datepicker,
} from "../../uiElements/support/uiService";
import BasePage from "../core/BasePage";

export class PracticeFormPage extends BasePage {
  readonly form: Form;
  readonly radio: Radio;
  readonly checkbox: Checkbox;
  readonly selector: Selector;
  readonly datepicker: Datepicker;

  constructor(page: Page) {
    super(page);
    this.form = new Form(this.page);
    this.radio = new Radio(this.page);
    this.checkbox = new Checkbox(this.page);
    this.selector = new Selector(this.page);
    this.datepicker = new Datepicker(this.page);
  }
}

//datepicker, filechooser?
