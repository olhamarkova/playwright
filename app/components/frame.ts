import { Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { GetLocatorOptions } from "./support/types/OptionsTypes";

export class Frame extends Component {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Frame ID must be provided
   * @param frame ID of the frame
   * @returns Locator
   */
  getFrameElement(frame: string, element: string): Locator {
    return this.page.frameLocator(`#${frame}`).locator(element);
  }

  getNestedFrameElement(
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
