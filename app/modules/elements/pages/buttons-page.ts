import { type Page, Locator } from "@playwright/test";
import BasePage from "../../core/BasePage";
import { Button, Text } from "../../../components/support/component-service";
import { ClickMeButtons } from "../support/types";
import { successMessages } from "../support/data";

export class ButtonsPage extends BasePage {
  private readonly button: Button;
  private readonly textMessage: Text;

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);
    this.textMessage = new Text(this.page);
  }

  private successMsg(text: string): Locator {
    return this.textMessage.getByText(text);
  }

  private buttons(name: ClickMeButtons): Locator {
    return this.button.getByName(name);
  }

  private async clickBtn(button: ClickMeButtons): Promise<void> {
    await this.button.click(this.buttons(button));
  }

  private async rightClick(button: ClickMeButtons): Promise<void> {
    await this.button.click(this.buttons(button), { button: "right" });
  }

  private async doubleClick(button: ClickMeButtons): Promise<void> {
    await this.button.dbClick(this.buttons(button));
  }

  private async verifySucessMsg(sucessMsg: string): Promise<void> {
    await this.textMessage.isVisible(this.successMsg(sucessMsg));
  }

  private doClick = {
    click: () => this.clickBtn("Click Me"),
    right: () => this.rightClick("Right Click Me"),
    double: () => this.doubleClick("Double Click Me"),
  };

  async verifyButton(clickType: "click" | "right" | "double"): Promise<void> {
    switch (clickType) {
      case "click":
        await this.doClick.click();
        await this.verifySucessMsg(successMessages.dynamicClick);
        break;
      case "right":
        await this.doClick.right();
        await this.verifySucessMsg(successMessages.rightClick);
        break;
      case "double":
        await this.doClick.double();
        await this.verifySucessMsg(successMessages.doubleClick);
        break;
      default:
        console.log(`Something went wrong. Check your data!`);
    }
  }
}
