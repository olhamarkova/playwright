import { type Locator, type Page } from "@playwright/test";
import { expect } from "@playwright/test";
import BasePage from "../BasePage";
import LeftPannel from "../leftPanel/LeftPannel";

export class TextBoxPage extends BasePage {
  readonly sidebar: LeftPannel;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly currentAddressInput: Locator;
  readonly permanentAddress: Locator;
  readonly submitButton: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.sidebar = new LeftPannel(page);
    this.fullNameInput = this.page.locator("#userName");
    this.emailInput = this.page.locator("#userEmail");
    this.currentAddressInput = this.page.locator("#currentAddress");
    this.permanentAddress = this.page.locator("#permanentAddress");
    this.submitButton = this.page.locator("#submit");
  }
}
