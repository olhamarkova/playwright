import { Locator } from "@playwright/test";
import { ClickOptions, CheckOptions, TextOptions } from "../types/options";

export interface Clickable {
  clickElement(element: Locator, options?: ClickOptions): void;
  dbClick(element: Locator): void;
}

export interface Checkable {
  check(element: Locator, options?: CheckOptions): void;
  uncheck(element: Locator, options?: CheckOptions): void;
  isChecked(element: Locator, isChecked: boolean): void;
}

export interface Textual {
  getByText(text: string, options?: TextOptions): void;
  hasText(element: Locator, text: string, options?: TextOptions): void;
  containText(element: Locator, text: string, options?: TextOptions): void;
}

export interface Writable {
  fillOut(element: Locator, value: string | string[]): void;
  fillOutSequentially(element: Locator, value: string): void;
  clear(input: Locator): void;
  isEditable(input: Locator): void;
  isEmpty(input: Locator): void;
  hasValue(input: Locator, value: string): void;
  hasPlaceholder(input: Locator, placeholder: string): void;
}
