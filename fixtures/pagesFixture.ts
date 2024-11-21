import { test as base } from "@playwright/test";
import { pageUrls } from "../app/modules/core/support/data";
import { MainPage } from "../app/modules/mainPage/MainPage";
import { ElementsPage } from "../app/modules/elementsPages/pages/ElementsPage";
import { WebTablesPage } from "../app/modules/elementsPages/pages/WebTablesPage";
import { ButtonsPage } from "../app/modules/elementsPages/pages/ButtonsPage";
import { CheckBoxPage } from "../app/modules/elementsPages/pages/CheckBoxPage";
import { DynamicPage } from "../app/modules/elementsPages/pages/DynamicPage";
import { ImagesPage } from "../app/modules/elementsPages/pages/ImagesPage";
import { LinksPage } from "../app/modules/elementsPages/pages/LinksPage";
import { RadioButtonPage } from "../app/modules/elementsPages/pages/RadioButtonPage";
import { TextBoxPage } from "../app/modules/elementsPages/pages/TextBoxPage";
import { UploadPage } from "../app/modules/elementsPages/pages/UploadPage";
import { PracticeFormPage } from "../app/modules/form/PracticeFormPage";

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
});

export const describe = test.describe;
export const expect = test.expect;
