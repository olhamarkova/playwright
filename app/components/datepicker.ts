import { Locator, Page } from "@playwright/test";
import { UiElement } from "./core/component";
import { Selector, Button } from "./support/uiService";
import { Clickable } from "./support/interfaces/clickable";
import { Days, Month, DayNames } from "./support/types/DatepickerTypes";

export class Datepicker extends UiElement implements Clickable {
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

  getDateSelector(className: "month" | "year"): Locator {
    return this.getByClass(`react-datepicker__${className}-select`);
  }

  navigationButton(buttonAriaLabel: "Previous Month" | "Next Month"): Locator {
    return this.button.getLocator(`button[aria-label="${buttonAriaLabel}"]`);
  }

  getDay(day: Days): Locator {
    return this.button.getByClass(`react-datepicker__day--0${day}`);
  }

  getDayName(dayName: DayNames): Locator {
    return this.button
      .getByClass("react-datepicker__day-name")
      .filter({ hasText: dayName });
  }

  async chooseYear(year: string): Promise<void> {
    await this.selector.chooseOption(this.getDateSelector("year"), year);
  }

  async chooseMonth(month: Month): Promise<void> {
    await this.selector.chooseOption(this.getDateSelector("month"), month);
  }

  async chooseDayByNumber(day: Days): Promise<void> {
    await this.button.clickElement(this.getDay(day));
  }
}
