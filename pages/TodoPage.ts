import { type Locator, type Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { text } from "../utils/services/data-service";

export default class TodoPage {
  readonly page: Page;
  readonly url: string;
  readonly header: Locator;
  readonly newTodoInput: Locator;
  readonly toggleNewTodo: Locator;
  readonly todoLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = process.env.URL!;
    this.header = this.page.locator("h1");
    this.newTodoInput = this.page.getByPlaceholder(text.placeholder);
    this.toggleNewTodo = this.page.getByTestId("todo-item-toggle");
    this.todoLabel = this.page.locator("label[data-testid='todo-item-label']");
  }

  async visit() {
    await this.page.goto(this.url);
  }

  async checkTitle() {
    await expect(this.page).toHaveTitle(text.title);
  }

  async checkHeader() {
    await expect(this.header).toHaveText(text.heading);
  }

  async addNewTodo(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press("Enter");
  }

  async validateTodoText(text: string, index: number) {
    await expect(this.todoLabel.nth(index)).toHaveText(text);
  }

  async checkCountOfTodos(msg: string) {
    await expect(this.page.getByText(msg)).toBeVisible();
  }

  async toggleTodo() {
    await this.toggleNewTodo.click();
  }
}
