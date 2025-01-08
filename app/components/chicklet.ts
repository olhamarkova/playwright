import { Page } from "@playwright/test";
import { Clickable, Textual } from "./support/interfaces/interfaces";
import { Component } from "./core/component";

export class Chicklet extends Component implements Clickable, Partial<Textual> {
  constructor(page: Page) {
    super(page);
  }
}
