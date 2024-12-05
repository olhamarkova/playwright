import { test as base } from "@playwright/test";
import { pageUrls } from "../app/modules/core/support/data";
import { MainPage } from "../app/modules/mainPage/MainPage";
import { ElementsPage } from "../app/modules/elements/pages/ElementsPage";
import { WebTablesPage } from "../app/modules/elements/pages/WebTablesPage";
import { ButtonsPage } from "../app/modules/elements/pages/ButtonsPage";
import { CheckBoxPage } from "../app/modules/elements/pages/CheckBoxPage";
import { DynamicPage } from "../app/modules/elements/pages/DynamicPage";
import { ImagesPage } from "../app/modules/elements/pages/ImagesPage";
import { LinksPage } from "../app/modules/elements/pages/LinksPage";
import { RadioButtonPage } from "../app/modules/elements/pages/RadioButtonPage";
import { TextBoxPage } from "../app/modules/elements/pages/TextBoxPage";
import { UploadPage } from "../app/modules/elements/pages/UploadPage";
import { PracticeFormPage } from "../app/modules/form/PracticeFormPage";
import { WindowsPage } from "../app/modules/alerts-and-frames/WindowsPage";
import { AlertsPage } from "../app/modules/alerts-and-frames/AlertsPage";
import { FramesPage } from "../app/modules/alerts-and-frames/FramesPage";

type Pages = {
  mainPage: MainPage;
  elementsPage: ElementsPage;
  tablePage: WebTablesPage;
  buttonPage: ButtonsPage;
  checkboxPage: CheckBoxPage;
  dynamicPage: DynamicPage;
  imagesPage: ImagesPage;
  linksPage: LinksPage;
  radioPage: RadioButtonPage;
  textBoxPage: TextBoxPage;
  uploadPage: UploadPage;
  formPage: PracticeFormPage;
  windowsPage: WindowsPage;
  alertsPage: AlertsPage;
  framesPage: FramesPage;
};

export const test = base.extend<Pages>({
  async mainPage({ page }, use) {
    return await use(new MainPage(page));
  },
  async elementsPage({ page }, use) {
    return await use(new ElementsPage(page, pageUrls.categories.elements));
  },
  async tablePage({ page }, use) {
    return await use(
      new WebTablesPage(page, pageUrls.subCategories.elements.webTables)
    );
  },
  async buttonPage({ page }, use) {
    return await use(
      new ButtonsPage(page, pageUrls.subCategories.elements.buttons)
    );
  },
  async checkboxPage({ page }, use) {
    return await use(
      new CheckBoxPage(page, pageUrls.subCategories.elements.checkbox)
    );
  },
  async dynamicPage({ page }, use) {
    return await use(
      new DynamicPage(page, pageUrls.subCategories.elements.dynamicProperties)
    );
  },
  async imagesPage({ page }, use) {
    return await use(
      new ImagesPage(page, pageUrls.subCategories.elements.brokenLinks)
    );
  },
  async linksPage({ page }, use) {
    return await use(
      new LinksPage(page, pageUrls.subCategories.elements.links)
    );
  },
  async radioPage({ page }, use) {
    return await use(
      new RadioButtonPage(page, pageUrls.subCategories.elements.radioButton)
    );
  },
  async textBoxPage({ page }, use) {
    return await use(
      new TextBoxPage(page, pageUrls.subCategories.elements.textBox)
    );
  },
  async uploadPage({ page }, use) {
    return await use(
      new UploadPage(page, pageUrls.subCategories.elements.uploadDownload)
    );
  },
  async formPage({ page }, use) {
    return await use(
      new PracticeFormPage(page, pageUrls.subCategories.practiceForm)
    );
  },
  async windowsPage({ page }, use) {
    return await use(
      new WindowsPage(page, pageUrls.subCategories.alertsAndFrames.windows)
    );
  },
  async alertsPage({ page }, use) {
    return await use(
      new AlertsPage(page, pageUrls.subCategories.alertsAndFrames.alerts)
    );
  },
  async framesPage({ page }, use) {
    return await use(
      new FramesPage(page, pageUrls.subCategories.alertsAndFrames.frames)
    );
  },
});

export const describe = test.describe;
export const expect = test.expect;