import { Page } from "@playwright/test";
import { urls } from "..//modules/core/support/data";
import { MainPage } from "../modules/main-page/main-page";
import { ElementsPage } from "../modules/elements/pages/elements-page";
import { WebTablesPage } from "../modules/elements/pages/table-page";
import { ButtonsPage } from "../modules/elements/pages/buttons-page";
import { CheckBoxPage } from "../modules/elements/pages/checkbox-page";
import { DynamicPage } from "../modules/elements/pages/dynamic-page";
import { ImagesPage } from "../modules/elements/pages/images-page";
import { LinksPage } from "../modules/elements/pages/links-page";
import { RadioButtonPage } from "../modules/elements/pages/radio-page";
import { TextBoxPage } from "../modules/elements/pages/textbox-page";
import { UploadPage } from "../modules/elements/pages/upload-page";
import { PracticeFormPage } from "../modules/form/practice-form-page";
import { WindowsPage } from "../modules/alerts-and-iframes/windows-page";
import { AlertsPage } from "../modules/alerts-and-iframes/alerts-page";
import { iFramesPage } from "../modules/alerts-and-iframes/iframes-page";
import { NestedFramesPage } from "../modules/alerts-and-iframes/nested-frames";
import { ModalsPage } from "../modules/alerts-and-iframes/modals-page";
import { AccordianPage } from "../modules/widgets/accordian-page";

export class AppManager {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get main() {
    return new MainPage(this.page);
  }

  get elements() {
    return new ElementsPage(this.page, urls.categories.elements);
  }

  get table() {
    return new WebTablesPage(this.page, urls.subCategories.elements.webTables);
  }

  get buttons() {
    return new ButtonsPage(this.page, urls.subCategories.elements.buttons);
  }

  get checkboxes() {
    return new CheckBoxPage(this.page, urls.subCategories.elements.checkbox);
  }

  get dynamic() {
    return new DynamicPage(
      this.page,
      urls.subCategories.elements.dynamicProperties
    );
  }

  get images() {
    return new ImagesPage(this.page, urls.subCategories.elements.brokenLinks);
  }

  get links() {
    return new LinksPage(this.page, urls.subCategories.elements.links);
  }

  get radio() {
    return new RadioButtonPage(
      this.page,
      urls.subCategories.elements.radioButton
    );
  }

  get textbox() {
    return new TextBoxPage(this.page, urls.subCategories.elements.textBox);
  }

  get upload() {
    return new UploadPage(
      this.page,
      urls.subCategories.elements.uploadDownload
    );
  }

  get form() {
    return new PracticeFormPage(this.page, urls.subCategories.practiceForm);
  }

  get windows() {
    return new WindowsPage(
      this.page,
      urls.subCategories.alertsAndFrames.windows
    );
  }

  get alerts() {
    return new AlertsPage(this.page, urls.subCategories.alertsAndFrames.alerts);
  }

  get iframes() {
    return new iFramesPage(
      this.page,
      urls.subCategories.alertsAndFrames.frames
    );
  }

  get nestedFrames() {
    return new NestedFramesPage(
      this.page,
      urls.subCategories.alertsAndFrames.nestedFrames
    );
  }

  get modals() {
    return new ModalsPage(this.page, urls.subCategories.alertsAndFrames.modals);
  }

  get accordian() {
    return new AccordianPage(this.page, urls.subCategories.widgets.accordian);
  }
}
