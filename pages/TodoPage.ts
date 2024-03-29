import { type Locator, type Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { text } from "../data/texts";

export class TodoPage {
  readonly page: Page;
  readonly url: string;
  readonly header: Locator;
  readonly newTodoInput: Locator;
  readonly toggleNewTodo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = "https://todomvc.com/examples/react/dist/";
    this.header = this.page.locator("h1");
    this.newTodoInput = this.page.getByPlaceholder(text.placeholder);
    this.toggleNewTodo = this.page.getByTestId("todo-item-toggle");
  }

  async visit() {
    await this.page.goto(this.url);
  }

  async checkTitle() {
    await expect(this.page).toHaveTitle(text.title);
  }

  async checkHeader() {
    await expect(this.header).toHaveText(text.header);
  }

  async addNewTodo(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press("Enter");
  }

  async checkCountOfTodos(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async toggleTodo() {
    await this.toggleNewTodo.click();
  }
}

export default TodoPage;
