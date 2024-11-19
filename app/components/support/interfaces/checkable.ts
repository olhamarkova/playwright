import { Locator } from "@playwright/test";

export interface Checkable {
  check(element: Locator | string, options?: {}): void;
  uncheck(element: Locator | string, options?: {}): void;
  isChecked(element: Locator | string, isChecked: boolean): void;
}
