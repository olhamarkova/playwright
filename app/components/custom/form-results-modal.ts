//Modal on the Practice Form page

import { Page, Locator, expect } from "@playwright/test";
import { Modal, Table } from "../support/component-service";
import { resultsModalTitle } from "../../modules/form/support/data";
import { Person } from "../../../utils/buildPerson";
import { Genders, Hobbies } from "../../modules/form/support/types";

export class ResultsModal extends Modal {
  private readonly table: Table;
  private readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.table = new Table(this.page);
    this.heading = this.getById("example-modal-sizes-title-lg");
  }

  private studentInfoCell(rowNumber: number): Locator {
    return this.table.rowByNumber(rowNumber).getByRole("cell").nth(1);
  }

  private labelCell(rowNumber: number): Locator {
    return this.table.rowByNumber(rowNumber).getByRole("cell").nth(0);
  }

  private getResults(data: Person) {
    const dateOfBirth = data.birthDate!.replace(", ", ",");
    const subjects = data.subjects!.toString().replace(",", ", ");
    //@ts-ignore
    const gender = this.getEnumKey(Genders, data.gender!);
    //@ts-ignore
    const hobby = this.getEnumKey(Hobbies, data.hobby!);

    const studentInfo = new Map<string, string>([
      ["Student Name", `${data.firstName} ${data.lastName}`],
      ["Student Email", `${data.email}`],
      ["Gender", `${gender}`],
      ["Mobile", `${data.mobile}`],
      ["Date of Birth", `${dateOfBirth}`],
      ["Subjects", `${subjects}`],
      ["Hobbies", `${hobby}`],
      ["Picture", `${data.picture}`],
      ["Address", `${data.currentAddress}`],
      ["State and City", `${data.state} ${data.city}`],
    ]);

    return studentInfo;
  }

  private getEnumKey(
    type: Genders | Hobbies,
    value: string
  ): string | undefined {
    const values = Object.keys(type as Object);
    return values[Number(value) - 1];
  }

  /**
   * Ensures that every row contains correct columns and data
   */
  async verifyResultsTable(data: Person): Promise<void> {
    const studentInfo = this.getResults(data);
    let rowNumber = 2;
    for (const [label, value] of studentInfo.entries()) {
      const labelValue = await this.table.getContent(this.labelCell(rowNumber));
      const info = await this.table.getContent(this.studentInfoCell(rowNumber));
      expect(labelValue).toEqual(label);
      expect(info).toEqual(value);
      rowNumber++;
    }
  }

  //'Close' button is covered by advertisement and Playwright's force click doesn't work here.
  async close(): Promise<void> {
    await this.page.evaluate(async () => {
      const closeButton = document.getElementById("closeLargeModal");
      if (!closeButton) {
        throw new Error("Such a button does not exist!");
      } else {
        closeButton!.click();
      }
    });
  }

  async verifyOpened() {
    await this.title.hasText(this.heading, resultsModalTitle);
  }

  async verifyClosed() {
    await this.isVisible(this.modal(), false);
  }
}
