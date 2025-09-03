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
  }

  async fillMultipleColorInput(text: string) {
    await this.input.fillOut(this.multipleColorInput, text);
  }

  async pickColor(color: string) {
    await this.input.click(this.input.getByText(color));
  }

  async verifyColorsCount(count: number) {
    await this.chicklet.hasCount(this.colorResult, count);
  }

  async verifyColorValues(value: string[]) {
    const resultsQty = await this.chicklet.getQuantity(this.colorResult);
    for (let i = 0; i < resultsQty; i++) {
      await this.chicklet.hasText(this.colorResult.nth(i), value[i]);
    }
  }
}
