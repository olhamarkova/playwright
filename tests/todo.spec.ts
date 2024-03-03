import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://todomvc.com/examples/react/dist/");
});
test("The page should have a correct title", async ({ page }) => {
  await expect(page).toHaveTitle("TodoMVC: React");
});

test("The page should have a correct header", async ({ page }) => {
  await expect(page.locator("h1")).toHaveText("todos");
});

test("The user should be able to add a new todo", async ({ page }) => {
  await page.getByPlaceholder("What needs to be done?").fill("Buy bread");
  await page.getByPlaceholder("What needs to be done?").press("Enter");
  await expect(page.getByText("1 item left!")).toBeVisible();
});

test("The user should be able to mark a todo as completed", async ({
  page,
}) => {
  await page.getByPlaceholder("What needs to be done?").fill("Buy milk");
  await page.getByPlaceholder("What needs to be done?").press("Enter");
  await page.getByTestId("todo-item-toggle").click();
  await expect(page.getByText("0 items left!")).toBeVisible();
});
