import { Locator, type Page } from "@playwright/test";
import BasePage from "../core/base-page";
import {
  Button,
  Text,
  Input,
  Datepicker,
} from "../../components/support/component-service";

export class DatePickerPage extends BasePage {
  public text: Text;
  public input: Input;
  public datePicker: Datepicker;

  constructor(page: Page, url: string) {
    super(page, url);
    this.text = new Text(this.page);
    this.input = new Input(this.page);
  }
}
