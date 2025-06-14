import { Locator, type Page } from "@playwright/test";
import BasePage from "../core/base-page";
import { Button, Text } from "../../components/support/component-service";
import { AccordianSections } from "./support/types";

export class AccordianPage extends BasePage {
  private readonly button: Button;
  public text: Text;

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);
    this.text = new Text(this.page);
  }

  private sectionHeading(section: AccordianSections): Locator {
    return this.button.getById(`section${section}Heading`);
  }

  private sectionContent(section: AccordianSections): Locator {
    return this.text.getById(`section${section}Content`);
  }

  public async clickSectionHeading(section: AccordianSections): Promise<void> {
    await this.button.click(this.sectionHeading(section));
  }

  public async verifySectionContent(
    section: AccordianSections,
    isVisible = true
  ): Promise<void> {
    await this.text.isVisible(this.sectionContent(section), isVisible);
  }
}
