import { type Page, expect, Locator } from "@playwright/test";
import { InnerPage } from "../../core/InnerPage";

export class DynamicPage extends InnerPage {
  readonly disabledButton: Locator;
  readonly changeColorButton: Locator;
  readonly invisibleButton: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.disabledButton = this.page.locator("#enableAfter");
    this.changeColorButton = this.page.locator("#colorChange");
    this.invisibleButton = this.page.locator("#visibleAfter");
  }

  async validateButtonClass(state: "before" | "after") {
    let color: string;
    if (state === "before") {
      color = "rgb(255, 255, 255)";
    }
    if (state === "after") {
      color = "rgb(220, 53, 69)";
    }
    await expect(this.changeColorButton).toHaveCSS("color", color!);
  }
}
