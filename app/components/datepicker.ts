import { Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { Selector, Button } from "./support/uiService";
import { Clickable } from "./support/interfaces/interfaces";
import { Days, Month, DayNames } from "./support/types/DatepickerTypes";

export class Datepicker extends Component implements Clickable {
  readonly selector: Selector;
  readonly button: Button;

  constructor(page: Page) {
    super(page);
    this.selector = new Selector(this.page);
    this.button = new Button(this.page);
  }

  getDatepicker(): Locator {
    return this.getByClass("react-datepicker");
  }

  dateSelector(className: "month" | "year"): Locator {
    return this.getByClass(`react-datepicker__${className}-select`);
  }

  navigationButton(buttonAriaLabel: "Previous Month" | "Next Month"): Locator {
    return this.button.getLocator(`button[aria-label="${buttonAriaLabel}"]`);
  }

  day(day: Days): Locator {
    return this.button.getByClass(`react-datepicker__day--0${day}`);
  }

  dayName(dayName: DayNames): Locator {
    return this.button
      .getByClass("react-datepicker__day-name")
      .filter({ hasText: dayName });
  }

  async chooseYear(year: string): Promise<void> {
    await this.selector.chooseOption(this.dateSelector("year"), year);
  }

  async chooseMonth(month: Month): Promise<void> {
    await this.selector.chooseOption(this.dateSelector("month"), month);
  }

  async chooseDayByNumber(day: Days): Promise<void> {
    await this.button.clickElement(this.day(day));
  }
}
