import { Locator, type Page, expect } from "@playwright/test";
import BasePage from "../core/BasePage";
import { Text, Frame } from "../../components/support/component-service";
import { Frames } from "./support/types";

export class iFramesPage extends BasePage {
  readonly text: Text;
  readonly frame: Frame;

  readonly firstFrameHeading: Locator;
  readonly secondFrameHeading: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.text = new Text(this.page);
    this.frame = new Frame(this.page);
  }

  frameHeading(frame: Frames) {
    return this.frame.getFrameElement(frame, "#sampleHeading");
  }

  async validateFrameHeading(frame: Frames, title: string) {
    await expect(this.frameHeading(frame)).toHaveText(title);
  }
}
