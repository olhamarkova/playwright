import { test } from "@playwright/test";
import TodoPage from "../pages/TodoPage.ts";
import { todos } from "../utils/services/data-service.ts";
import { generateItemLeftText } from "../utils/messageGenerator.ts";

let todo: TodoPage;

test.beforeEach(async ({ page }) => {
  todo = new TodoPage(page);
  await todo.visit();
});

test.describe("ToDo Page", () => {
  test("The page should have a correct title", async () => {
    await todo.checkTitle();
  });

  test("The page should have a correct header", async () => {
    await todo.checkHeader();
  });

  test("Working with todos", async () => {
    await test.step("Step 1: The user should be able to add a new todo", async () => {
      await todo.addNewTodo(todos.firstTodo);
      const msg = await generateItemLeftText(1);
      await todo.checkCountOfTodos(msg);
    });

    await test.step("Step 2: The user should be able to mark a todo as completed", async () => {
      await todo.toggleTodo();
      const msg = await generateItemLeftText(0);
      await todo.checkCountOfTodos(msg);
    });
  });
});
