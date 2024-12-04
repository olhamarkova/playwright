import { expect, type Locator, type Page } from "@playwright/test";
import BasePage from "../../core/BasePage";
import { TextBoxElementID } from "../../elementsPages/support/types";
import {
  Input,
  Text,
  Button,
} from "../../../components/support/component-service";

export class TextBoxPage extends BasePage {
  readonly input: Input;
  readonly textBox: Text;
  readonly button: Button;

  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly currentAddressInput: Locator;
  readonly permanentAddress: Locator;
  readonly submitButton: Locator;
  readonly output: Locator;
  readonly emailBorderCss: string;

  constructor(page: Page, url: string) {
    super(page, url);
    this.input = new Input(this.page);
    this.textBox = new Text(this.page);
    this.button = new Button(this.page);

    this.emailBorderCss = "1px solid rgb(255, 0, 0)";
    this.fullNameInput = this.input.getById("userName");
    this.emailInput = this.input.getById("userEmail");
    this.currentAddressInput = this.input.getTextAreaById("currentAddress");
    this.permanentAddress = this.input.getTextAreaById("permanentAddress");
    this.submitButton = this.button.getById("submit");
    this.output = this.textBox.getById("output");
  }

  userInfoOutput(elementId: TextBoxElementID): Locator {
    return this.output.locator(`#${elementId}`);
  }

  async validateUserInfoOutput(
    elementId: TextBoxElementID,
    text: string
  ): Promise<void> {
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
