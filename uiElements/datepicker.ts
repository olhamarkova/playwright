import { expect, Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { Selector, Button } from "./support/uiService";
import {
  CheckOptions,
  GetByRoleOptions,
  GetLocatorOptions,
} from "./support/types/OptionsTypes";
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
    return this.getLocator(".react-datepicker");
  }

  getDateSelector(className: "month" | "year"): Locator {
    return this.selector.getByClass(`react-datepicker__${className}-select`);
  }

  navigationButton(buttonAriaLabel: "Previous Month" | "Next Month"): Locator {
    return this.button.getLocator(`button[aria-label="${buttonAriaLabel}"]`);
  }

  getDay(day: Days): Locator {
    return this.button.getLocator(`.react-datepicker__day--${day}`);
  }

  getDayName(dayName: DayNames): Locator {
    return this.button
      .getLocator(".react-datepicker__day-name")
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
