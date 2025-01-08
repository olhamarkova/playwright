import { Locator, Page, expect } from "@playwright/test";
import { Component } from "./core/component";
import { GetLocatorOptions } from "./support/types/options";
import { Textual } from "./support/interfaces/interfaces";

export class iFrame extends Component implements Partial<Textual> {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Frame ID must be provided
   * @param frame ID of the frame
   * @returns Locator
   */
  frameElement(frame: string, element: string): Locator {
    return this.page.frameLocator(`#${frame}`).locator(element);
  }

  nestedFrameElement(
    parentFrame: string,
    childFrame: string,
    element: string,
    options?: GetLocatorOptions
  ): Locator {
    return this.page
      .frameLocator(`#${parentFrame}`)
      .frameLocator(`#${childFrame}`)
      .locator(element, options);
  }
}
