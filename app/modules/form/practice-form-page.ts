import { type Locator, type Page } from "@playwright/test";
import {
  Form,
  Radio,
  Checkbox,
  Selector,
  Datepicker,
  Filechooser,
  Chicklet,
} from "../../components/support/component-service";
import BasePage from "../core/base-page";
import { FormInputIds, Genders, Hobbies } from "./support/types";
import { ResultsModal } from "../../components/custom/form-results-modal";
import { formTitle } from "./support/data";
import { Days, Month } from "../../components/support/types/datepicker";
import { Person } from "../../../utils/buildPerson";

export class PracticeFormPage extends BasePage {
  private readonly form: Form;
  private readonly radio: Radio;
  private readonly checkbox: Checkbox;
  private readonly selector: Selector;
  private readonly datepicker: Datepicker;
  private readonly filechooser: Filechooser;
  private readonly chicklet: Chicklet;
  public readonly resultsModal: ResultsModal;

  private readonly formTitle: Locator;
  private readonly subjectInput: Locator;
  private readonly subjectLabel: Locator;
  private readonly submitBtn: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.form = new Form(this.page);
    this.radio = new Radio(this.page);
    this.checkbox = new Checkbox(this.page);
    this.selector = new Selector(this.page);
    this.datepicker = new Datepicker(this.page);
    this.filechooser = new Filechooser(this.page);
    this.chicklet = new Chicklet(this.page);
    this.resultsModal = new ResultsModal(this.page);

    this.formTitle = this.heading.getByClass("practice-form-wrapper h5");
    this.subjectInput = this.form.input.getByClass(
      "subjects-auto-complete__value-container"
    );
    this.subjectLabel = this.chicklet.getByClass(
      "subjects-auto-complete__multi-value__label"
    );
    this.submitBtn = this.form.button.getByType("submit");
  }

  private formInputs(inputId: FormInputIds): Locator {
    return this.form.input.getById(inputId);
  }

  private genderRadio(gender: Genders) {
    return this.radio.getLabel(`gender-radio-${gender}`);
  }

  private hobbiesCheckbox(hobby: Hobbies) {
    return this.checkbox.getById(`hobbies-checkbox-${hobby}`);
  }

  private stateSelector(selectorId: "state" | "city") {
    return this.selector.getById(selectorId);
  }

  async enterData(inputId: FormInputIds, data: string): Promise<void> {
    await this.form.enterValue(this.formInputs(inputId), data);
  }

  async openCalendar(): Promise<void> {
    await this.form.click(this.formInputs("dateOfBirthInput"));
  }

  async setGender(gender: Genders): Promise<void> {
    await this.radio.click(this.genderRadio(gender));
  }

  async setDateOfBirth(data: Person): Promise<void> {
    const date = this.getBirthDate(data);
    await this.datepicker.chooseYear(date[2]);
    await this.datepicker.chooseMonth(date[1] as Month);
    await this.datepicker.chooseDayByNumber(date[0] as Days);
  }

  private getBirthDate(data: Person): [number, string, string] {
    const day = Number(data.birthDate!.slice(0, 2));
    const month = data.birthDate!.slice(3, 7);
    const year = data.birthDate!.slice(9, 13);
    return [day, month, year];
  }

  async specifySubject(subject: string): Promise<void> {
    const value = subject.slice(0, 2);
    await this.form.click(this.subjectInput);
    await this.form.input.fillOutSequentially(this.subjectInput, value);
    await this.form.click(this.form.getByText(subject));
  }

  async setHobby(hobby: Hobbies): Promise<void> {
    await this.checkbox.check(this.hobbiesCheckbox(hobby), {
      force: true,
    }); //covered by advertisement
  }

  async addPhoto(fileName: string) {
    await this.filechooser.uploadFile(
      this.filechooser.chooseFileButton(),
      fileName
    );
  }

  async specifyState(area: "state" | "city", name: string): Promise<void> {
    await this.selector.click(this.stateSelector(area));
    await this.selector.click(this.selector.getByText(name));
  }

  async submit(): Promise<void> {
    await this.form.submit(this.submitBtn);
  }

  async verifyCalendarOpened(): Promise<void> {
    await this.datepicker.isVisible(this.datepicker.getDatepicker());
  }

  async verifyDateSet(data: Person): Promise<void> {
    const setDate = this.getSetDate(data);
    await this.verifyEnteredData("dateOfBirthInput", setDate);
  }

  private getSetDate(data: Person): string {
    const date = data.birthDate!.replace("e,", "");
    return date;
  }

  async verifyGenderSet(gender: Genders): Promise<void> {
    await this.checkbox.isChecked(this.genderRadio(gender), true);
  }

  async verifySubjects(subjects: string[]): Promise<void> {
    await this.chicklet.hasText(this.subjectLabel, subjects);
  }

  async verifyHobbySet(hobby: Hobbies): Promise<void> {
    await this.checkbox.isChecked(this.hobbiesCheckbox(hobby), true);
  }

  async verifyEnteredData(input: FormInputIds, value: string): Promise<void> {
    await this.form.verifyInputValue(this.formInputs(input), value);
  }

  async verifyFormTitle(): Promise<void> {
    await this.heading.hasText(this.formTitle, formTitle);
  }
}
