import { Page } from "@playwright/test";
import { urls } from "..//modules/core/support/data";
import { MainPage } from "../modules/mainPage/MainPage";
import { ElementsPage } from "../modules/elements/pages/elements-page";
import { WebTablesPage } from "../modules/elements/pages/WebTablesPage";
import { ButtonsPage } from "../modules/elements/pages/buttons-page";
import { CheckBoxPage } from "../modules/elements/pages/checkbox-page";
import { DynamicPage } from "../modules/elements/pages/dynamic-page";
import { ImagesPage } from "../modules/elements/pages/images-page";
import { LinksPage } from "../modules/elements/pages/links-page";
import { RadioButtonPage } from "../modules/elements/pages/RadioButtonPage";
import { TextBoxPage } from "../modules/elements/pages/TextBoxPage";
import { UploadPage } from "../modules/elements/pages/UploadPage";
import { PracticeFormPage } from "../modules/form/PracticeFormPage";
import { WindowsPage } from "../modules/alerts-and-iframes/WindowsPage";
import { AlertsPage } from "../modules/alerts-and-iframes/AlertsPage";
import { iFramesPage } from "../modules/alerts-and-iframes/iFramesPage";

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
}
