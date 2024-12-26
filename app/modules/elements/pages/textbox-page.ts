import { expect, type Locator, type Page } from "@playwright/test";
import BasePage from "../../core/BasePage";
import { InputId, OutputElementId } from "../../elements/support/types";
import {
  Input,
  Text,
  Button,
} from "../../../components/support/component-service";

export class TextBoxPage extends BasePage {
  private readonly input: Input;
  private readonly textBox: Text;
  private readonly button: Button;

  private readonly submitButton: Locator;
  private readonly output: Locator;
  public readonly errorBorderCss: string;

  constructor(page: Page, url: string) {
    super(page, url);
    this.input = new Input(this.page);
    this.textBox = new Text(this.page);
    this.button = new Button(this.page);

    this.errorBorderCss = "1px solid rgb(255, 0, 0)";
    this.submitButton = this.button.getById("submit");
    this.output = this.textBox.getById("output");
  }

  private userInfoOutput(elementId: OutputElementId): Locator {
    return this.output.locator(`#${elementId}`);
  }

  private inputField(id: InputId): Locator {
    return this.input.getById(id);
  }

  async enterData(inputId: InputId, value: string): Promise<void> {
    await this.input.fillOut(this.inputField(inputId), value);
  }

  async submitForm(): Promise<void> {
    await this.button.click(this.submitButton);
  }

  async verifyInputBorder(inputId: InputId, cssValue: string) {
    await this.textBox.hasCSS(this.inputField(inputId), {
      property: "border",
      value: cssValue,
    });
  }

  async verifyOutput(elementId: OutputElementId, text: string): Promise<void> {
    switch (elementId) {
      case "name":
        await expect(this.userInfoOutput(elementId)).toHaveText(`Name:${text}`);
        break;
      case "email":
        await expect(this.userInfoOutput(elementId)).toHaveText(
          `Email:${text}`
        );
        break;
      case "currentAddress":
        await expect(this.userInfoOutput(elementId)).toHaveText(
          `Current Address :${text}`
        );
        break;
      case "permanentAddress":
        await expect(this.userInfoOutput(elementId)).toHaveText(
          `Permananet Address :${text}`
        );
        break;
      default:
        console.log("Something went wrong. Please check your data");
    }
  }
}
