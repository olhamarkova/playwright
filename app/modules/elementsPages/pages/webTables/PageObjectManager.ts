import { WebTablesPage } from "./WebTablesPage";
import AddNewRecordForm from "./AddNewRecordForm";
import { Page } from "@playwright/test";

export class WebTableManager {
  protected page: Page;
  protected url: string;

  constructor(page: Page, url: string) {
    this.page = page;
    this.url = url;
  }

  getTable() {
    return new WebTablesPage(this.page, this.url);
  }

  getForm() {
    return new AddNewRecordForm(this.page);
  }
}
