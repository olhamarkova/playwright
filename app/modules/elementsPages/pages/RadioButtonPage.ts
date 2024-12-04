import { expect, type Locator, type Page } from "@playwright/test";
import BasePage from "../../core/BasePage";
import { Radio, Text } from "../../../components/support/component-service";
import { RadioLabels } from "../../elementsPages/support/types";

export class RadioButtonPage extends BasePage {
  readonly radio: Radio;
  readonly textBox: Text;

  readonly question: Locator;
  readonly radioButtons: Locator;
  readonly successMsg: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.radio = new Radio(this.page);
    this.textBox = new Text(this.page);

    this.question = this.textBox.getLocator(".mb-3");
    this.radioButtons = this.radio.getRadio();
    this.successMsg = this.textBox.getLocator(".mt-3");
  }

  labelForRadio(label: "Yes" | "Impressive"): Locator {
    return this.textBox.getByText(label);
  }

  radioButton(label: RadioLabels): Locator {
    return this.radio.getLocator(`#${label}Radio`);
  }

  async validateEnabledRadioBtns(): Promise<void> {
    const radioBtns = ["yes", "impressive"];
    for (let i = 0; i < radioBtns.length; i++) {
      await this.radio.isElementEnabled(
        this.radioButton(radioBtns[i] as Exclude<RadioLabels, "no">)
      );
    }
  }

  async validateSuccessMessage(message: "Yes" | "Impressive"): Promise<void> {
    await expect(this.successMsg).toHaveText(`You have selected ${message}`);
  }
}
