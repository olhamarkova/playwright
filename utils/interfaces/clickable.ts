import { Locator } from "@playwright/test";
import { ClickOptions } from "../types/Options";

export interface Clickable {
  clickElement(element: Locator | string, options?: ClickOptions): void;
  dbClick(element: Locator | string): void;
}
