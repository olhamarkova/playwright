import { Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { Clickable } from "./support/interfaces/interfaces";
import { Textual } from "./support/interfaces/interfaces";

export class Link extends Component implements Clickable, Partial<Textual> {
  constructor(page: Page) {
    super(page);
  }

  links(): Locator {
    return this.page.getByRole("link");
  }

  getByName(name: string, isExact: boolean = true): Locator {
    return this.page.getByRole("link", { name: name, exact: isExact });
  }

  async validateByAnchors(anchors: string[]): Promise<void> {
    for (let i = 0; i < anchors.length; i++) {
      const element = this.getByName(anchors[i]);
      await this.isVisible(element);
    }
  }
}
