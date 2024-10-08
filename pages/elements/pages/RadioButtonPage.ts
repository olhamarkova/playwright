import { expect, type Locator, type Page } from "@playwright/test";
import { InnerPage } from "../../core/InnerPage";

export class RadioButtonPage extends InnerPage {
  readonly question: Locator;
  readonly radioButtons: Locator;
  readonly successMsg: Locator;

  constructor(page: Page, url: string) {
    super(page, url);

    this.question = this.page.locator("mb-3");
    this.radioButtons = this.page.locator("input[type='radio']");
    this.successMsg = this.page.locator(".mt-3");
  }

  labelForRadio(label: "Yes" | "Impressive") {
    return this.page.getByText(label);
  }

  radioButton(label: "yes" | "impressive" | "no") {
    return this.page.locator(`#${label}Radio`);
  }

  async validateDisabledElement<T extends string | Locator>(element: T) {
    const radio = this.radioButton(element as "no");
    await expect(radio).toBeDisabled();
  }

  async validateEnabledElement<T extends string | Locator>(element: T) {
    const radio = this.radioButton(element as "yes" | "impressive");
    await expect(radio).toBeEnabled();
  }

  async validateEnabledRadioBtns() {
    const radioBtns = ["yes", "impressive"];
    for (let i = 0; i < radioBtns.length; i++) {
      await this.validateEnabledElement(radioBtns[i]);
    }
  }

  async validateSuccessMessage(message: "Yes" | "Impressive") {
    await expect(this.successMsg).toHaveText(`You have selected ${message}`);
  }
}
