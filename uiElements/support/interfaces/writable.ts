import { Locator } from "@playwright/test";

export interface Writable {
  fillOut(element: Locator | string, value: string | string[]): void;
  fillOutSequentially(element: Locator | string, value: string): void;
  clear(input: Locator | string): void;
  isEditable(input: Locator | string): void;
  isEmpty(input: Locator | string): void;
  hasValue(input: Locator | string, value: string): void;
  hasPlaceholder(input: Locator | string, placeholder: string): void;
}
