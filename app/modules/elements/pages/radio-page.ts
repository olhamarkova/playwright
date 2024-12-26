import { expect, type Locator, type Page } from "@playwright/test";
import BasePage from "../../core/BasePage";
import { Radio, Text } from "../../../components/support/component-service";
import { RadioIds, RadioLabel } from "../support/types";
import { questionText } from "../support/data";

export class RadioButtonPage extends BasePage {
  private readonly radio: Radio;
  private readonly textBox: Text;

  private readonly question: Locator;
  private readonly successMsg: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.radio = new Radio(this.page);
    this.textBox = new Text(this.page);

    this.question = this.textBox.getByLocator(".mb-3");
    this.successMsg = this.textBox.getByLocator(".mt-3");
  }

  labelForRadio(label: RadioLabel): Locator {
    return this.textBox.getByText(label);
  }

  radioButton(id: RadioIds): Locator {
    return this.radio.getByLocator(`#${id}Radio`);
  }

  async checkRadio(label: RadioLabel): Promise<void> {
    await this.radio.click(this.labelForRadio(label));
  }

  async verifyQuestion(): Promise<void> {
    await this.textBox.hasText(this.question, questionText);
  }

  async verifyEnabledRadios(): Promise<void> {
    const radioBtns = ["yes", "impressive"];
    for (let i = 0; i < radioBtns.length; i++) {
      await this.radio.isEnabled(
        this.radioButton(radioBtns[i] as Exclude<RadioIds, "no">)
      );
    }
  }

  async verifyDisabledRadio(): Promise<void> {
    await this.radio.isEnabled(this.radioButton("no"), false);
  }

  async verifySuccessMessage(message: RadioLabel): Promise<void> {
    await expect(this.successMsg).toHaveText(`You have selected ${message}`);
  }
}
