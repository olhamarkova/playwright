import { Locator, type Page, expect } from "@playwright/test";
import BasePage from "../core/BasePage";
import { Button, Text } from "../../components/support/component-service";
import { AlertButtonsId } from "./support/types";

export class AlertsPage extends BasePage {
  readonly button: Button;
  readonly text: Text;

  readonly buttons: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);
    this.text = new Text(this.page);

    this.buttons = this.button.getByName("Click me");
  }

  clickMeButton(buttonId: AlertButtonsId): Locator {
    return this.button.getById(`${buttonId}Button`);
  }

  resultMessage(msg: "confirm" | "prompt"): Locator {
    return this.text.getById(`${msg}Result`);
  }

  async confirmDelayedAlert(
    element: Locator,
    message: string,
    prompt?: string
  ): Promise<void> {
    const [dialog] = await Promise.all([
      this.page.waitForEvent("dialog"),
      element.click(),
    ]);
    expect(dialog.message()).toBe(message);
    await dialog.accept(prompt ? prompt : "");
  }
}
