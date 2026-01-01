import { Locator, type Page } from "@playwright/test";
import BasePage from "../core/base-page";
import {
  Button,
  Text,
  Chicklet,
  Input,
} from "../../components/support/component-service";

export class AutocompletePage extends BasePage {
  private readonly button: Button;
  public text: Text;
  private readonly chicklet: Chicklet;
  private readonly input: Input;
  private readonly multipleColorInput: Locator;
  private readonly singleColorInput: Locator;
  private readonly colorResult: Locator;
  private readonly singleColorResult: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);
    this.text = new Text(this.page);
    this.chicklet = new Chicklet(this.page);
    this.input = new Input(this.page);

    this.multipleColorInput = this.input.getById("autoCompleteMultipleInput");
    this.singleColorInput = this.input.getById("autoCompleteSingleInput");
    this.colorResult = this.chicklet.getByClass(
      "auto-complete__multi-value__label"
    );
    this.singleColorResult = this.input.getByClass(
      "auto-complete__single-value"
    );
  }

  async fillMultipleColorInput(text: string): Promise<void> {
    await this.input.fillOut(this.multipleColorInput, text);
  }

  async fillSingleColorInput(text: string): Promise<void> {
    await this.input.fillOut(this.singleColorInput, text);
  }

  async pickColor(color: string): Promise<void> {
    await this.input.click(this.input.getByText(color));
  }

  async verifyColorsCount(count: number): Promise<void> {
    await this.chicklet.hasCount(this.colorResult, count);
  }

  async verifyColorValues(value: string[]): Promise<void> {
    const resultsQty = await this.chicklet.getQuantity(this.colorResult);
    for (let i = 0; i < resultsQty; i++) {
      await this.chicklet.hasText(this.colorResult.nth(i), value[i]);
    }
  }

  async verifySingleColorValue(value: string): Promise<void> {
    await this.input.hasText(this.singleColorResult, value);
  }
}
