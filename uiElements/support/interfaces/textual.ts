import { Locator } from "@playwright/test";

export interface Textual {
  getByText(text: string, options?: {}): void;
  hasText(element: Locator | string, text: string, options?: {}): void;
  containText(element: Locator | string, text: string, options: {}): void;
}
