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

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);
    this.text = new Text(this.page);
    this.chicklet = new Chicklet(this.page);
    this.input = new Input(this.page);
  }
}
