import { Locator, type Page, expect } from "@playwright/test";
import BasePage from "../core/base-page";
import { Text, iFrame } from "../../components/support/component-service";

export class NestedFramesPage extends BasePage {
  readonly text: Text;
  readonly iframe: iFrame;

  constructor(page: Page, url: string) {
    super(page, url);
    this.text = new Text(this.page);
    this.iframe = new iFrame(this.page);
  }

  private parentFrameHeading(): Locator {
    return this.iframe.frameElement("frame1", "body").getByText("Parent frame");
  }

  private childFrameHeading(): Locator {
    return this.iframe
      .frameElement("frame1", "iframe")
      .contentFrame()
      .getByText("Child iFrame");
  }

  async verifyParentFrame(): Promise<void> {
    await expect(this.parentFrameHeading()).toBeVisible();
  }

  async verifyChildFrame(): Promise<void> {
    await expect(this.childFrameHeading()).toBeVisible();
  }
}
