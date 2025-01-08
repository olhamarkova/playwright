import { Locator, type Page } from "@playwright/test";
import BasePage from "../core/base-page";
import { Text, iFrame } from "../../components/support/component-service";
import { Frames } from "./support/types";
import { newWindowsContent } from "./support/data";

export class iFramesPage extends BasePage {
  readonly text: Text;
  readonly iframe: iFrame;

  constructor(page: Page, url: string) {
    super(page, url);
    this.text = new Text(this.page);
    this.iframe = new iFrame(this.page);
  }

  private frameHeading(frame: Frames): Locator {
    return this.iframe.frameElement(frame, "#sampleHeading");
  }

  async verifyFrameHeading(frame: Frames): Promise<void> {
    await this.iframe.hasText(
      this.frameHeading(frame),
      newWindowsContent.title
    );
  }
}
