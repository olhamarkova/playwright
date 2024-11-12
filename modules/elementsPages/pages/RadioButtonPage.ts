import { expect, type Locator, type Page } from "@playwright/test";
import BasePage from "../../core/BasePage";
import { Radio, Text } from "../../../utils/services/uiService";
import { RadioLabels } from "../../../utils/types/ElementsTypes";

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

  labelForRadio(label: "Yes" | "Impressive") {
    return this.textBox.getByText(label);
  }

  radioButton(label: RadioLabels) {
    return this.radio.getLocator(`#${label}Radio`);
  }

  async validateEnabledRadioBtns() {
    const radioBtns = ["yes", "impressive"];
    for (let i = 0; i < radioBtns.length; i++) {
      await this.radio.isElementEnabled(
        this.radioButton(radioBtns[i] as Exclude<RadioLabels, "no">)
      );
    }
  }

  async validateSuccessMessage(message: "Yes" | "Impressive") {
    await expect(this.successMsg).toHaveText(`You have selected ${message}`);
  }
}
