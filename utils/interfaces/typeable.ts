import { Locator } from "@playwright/test";

export interface Typeable {
  fillOut(element: Locator | string): void;
  fillOutSequentially(element: Locator | string): void;
  clear(input: Locator | string): void;
}
