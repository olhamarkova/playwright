import { Locator, type Page, expect } from "@playwright/test";
import BasePage from "../core/base-page";
import { Button, Text } from "../../components/support/component-service";
import { AlertButtonsId } from "./support/types";
import { resultMessage, alertMessage } from "./support/data";

export class AlertsPage extends BasePage {
  private readonly button: Button;
  private readonly text: Text;

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);
    this.text = new Text(this.page);
  }

  private clickMeButton(buttonId: AlertButtonsId): Locator {
    return this.button.getById(`${buttonId}Button`);
  }

  private resultMessage(msg: "confirm" | "prompt"): Locator {
    return this.text.getById(`${msg}Result`);
  }

  private async confirmDelayedAlert(
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

  async confirmAlertMsg(): Promise<void> {
    await this.confirmAlert(this.clickMeButton("alert"), alertMessage.alert);
  }

  async confirmDelayed(): Promise<void> {
    await this.confirmDelayedAlert(
      this.clickMeButton("timerAlert"),
      alertMessage.delayedAlert
    );
  }

  async dismissAlertMsg(): Promise<void> {
    await this.dismsissAlert(
      this.clickMeButton("confirm"),
      alertMessage.confirmAlert
    );
  }

  async confirmPromptBox(prompt: string): Promise<void> {
    await this.confirmAlert(
      this.clickMeButton("promt"),
      alertMessage.prompt,
      prompt
    );
  }

  async verifyPromptResult(prompt: string) {
    await this.text.hasText(
      this.resultMessage("prompt"),
      resultMessage.prompt(prompt)
    );
  }

  async verifyConfirmResult(response: "Cancel" | "OK") {
    await this.text.hasText(
      this.resultMessage("confirm"),
      resultMessage.confirm(response)
    );
  }
}
