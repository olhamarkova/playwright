import { Locator } from "@playwright/test";

export interface Checkable {
  check(element: Locator | string): void;
  isChecked(element: Locator | string, isChecked: boolean): void;
}
