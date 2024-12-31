import { type Page, Locator } from "@playwright/test";
import BasePage from "../../core/base-page";
import { Button, Text } from "../../../components/support/component-service";
import { dynamicText } from "../support/data";
import { dynamicButtonsColor } from "../support/classes";

export class DynamicPage extends BasePage {
  private readonly button: Button;
  private readonly text: Text;

  private readonly disabledButton: Locator;
  private readonly changeColorButton: Locator;
  private readonly invisibleButton: Locator;
  private readonly dynamicText: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);
    this.text = new Text(this.page);

    this.disabledButton = this.button.getById("enableAfter");
    this.changeColorButton = this.button.getById("colorChange");
    this.invisibleButton = this.button.getById("visibleAfter");
    this.dynamicText = this.text.getByText(dynamicText);
  }

  async verifyTextMessage(): Promise<void> {
    await this.text.isVisible(this.dynamicText);
  }

  async verifyEnabled(isEnabled: boolean = true): Promise<void> {
    await this.button.isEnabled(this.disabledButton, isEnabled);
  }

  async verifyColor(color: "before" | "after"): Promise<void> {
    await this.button.hasCSS(this.changeColorButton, {
      property: "color",
      value:
        color === "before"
          ? dynamicButtonsColor.before
          : dynamicButtonsColor.after,
    });
  }

  async verifyVisible(): Promise<void> {
    await this.button.isVisible(this.invisibleButton);
  }

  async waitForButton(): Promise<void> {
    await this.invisibleButton.waitFor();
  }
}
