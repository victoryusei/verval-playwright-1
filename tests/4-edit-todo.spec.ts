import { expect, test } from "@playwright/test";
import { TODO_ITEMS, createTodo } from "./variables";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
  await createTodo(page, TODO_ITEMS);
});

test("should hide other controls when editing", async ({ page }) => {
  const todoItem = page.getByTestId("todo-item").nth(0);
  await todoItem.dblclick();
  await expect(todoItem.getByRole("checkbox")).not.toBeVisible();
  await expect(
    todoItem.locator("label", {
      hasText: TODO_ITEMS[0],
    })
  ).not.toBeVisible();
});

test("should save edits on blur", async ({ page }) => {
  const editText = "beli sosis";
  const todoItems = page.getByTestId("todo-item");
  await todoItems.nth(0).dblclick();
  await todoItems.nth(0).getByRole("textbox", { name: "Edit" }).fill(editText);
  await page.getByRole("heading", { name: "todos" }).click();

  await expect(todoItems).toHaveText([editText, TODO_ITEMS[1], TODO_ITEMS[2]]);
});

test("should trim entered text", async ({ page }) => {
  const editText = "beli baju";
  const todoItems = page.getByTestId("todo-item");
  await todoItems.nth(0).dblclick();
  await todoItems
    .nth(0)
    .getByRole("textbox", { name: "Edit" })
    .fill(`    ${editText}    `);
  await todoItems.nth(0).getByRole("textbox", { name: "Edit" }).press("Enter");

  await expect(todoItems).toHaveText([editText, TODO_ITEMS[1], TODO_ITEMS[2]]);
});
