import { Locator } from "@playwright/test";

export interface Clickable {
  clickElement(element: Locator | string, options?: {}): void;
  dbClick(element: Locator | string): void;
}
