import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://todomvc.com/examples/react/dist/");
});
test("The page should have a correct title", async ({ page }) => {
  await expect(page).toHaveTitle("TodoMVC: React");
  /*   await page.getByPlaceholder("What needs to be done?").fill("Buy bread");
  await page.getByPlaceholder("What needs to be done?").press("Enter");
  await page.getByTestId("todo-item-toggle").click(); */
});

test("The page should have a correct header", async ({ page }) => {
  await expect(page.locator("h1")).toHaveText("todos");
});
