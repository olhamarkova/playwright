import { Locator, type Page } from "@playwright/test";
import BasePage from "../core/base-page";
import {
  Button,
  Text,
  Input,
  Datepicker,
} from "../../components/support/component-service";
import { getCurrentDateNumeric, getCurrentDateLong } from "./support/helpers";

export class DatePickerPage extends BasePage {
  public text: Text;
  public input: Input;
  public datePicker: Datepicker;
  private readonly selectDateInput: Locator;
  private readonly dateTimeInput: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.text = new Text(this.page);
    this.input = new Input(this.page);
    this.selectDateInput = this.input.getById("datePickerMonthYearInput");
    this.dateTimeInput = this.input.getById("dateAndTimePickerInput");
  }

  async verifySelectDateInputValue() {
    const currentDate = getCurrentDateNumeric();
    await this.input.hasValue(this.selectDateInput, currentDate);
  }

  async verifyDateTimeInputValue() {
    const currentDate = getCurrentDateLong();
    await this.input.hasValue(this.dateTimeInput, currentDate);
  }
}
