import { test, expect } from "@playwright/test";
import { createTodo, TODO_ITEMS } from "./variables";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

test("should allow me to add todo items", async ({ page }) => {
      // create a new todo locator
      const newTodo = page.getByPlaceholder("What needs to be done?");

      // Create 1st todo.
      await newTodo.fill(TODO_ITEMS[0]);
      await newTodo.press("Enter");
  
      // Make sure the list only has one todo item.
      await expect(page.getByTestId("todo-title")).toHaveText([TODO_ITEMS[0]]);
  
      // Create 2nd todo.
      await newTodo.fill(TODO_ITEMS[1]);
      await newTodo.press("Enter");
  
      // Make sure the list now has two todo items.
      await expect(page.getByTestId("todo-title")).toHaveText([
        TODO_ITEMS[0],
        TODO_ITEMS[1],
      ]);

      // Create 3rd todo.
      await newTodo.fill(TODO_ITEMS[2]);
      await newTodo.press("Enter");
  
      // Make sure the list now has three todo items.
      await expect(page.getByTestId("todo-title")).toHaveText([
        TODO_ITEMS[0],
        TODO_ITEMS[1],
        TODO_ITEMS[2]
      ]);
    });


test("should clear text input field when an item is added", async ({
  page,
}) => {
  // create a new todo locator
  const newTodo = page.getByPlaceholder("What needs to be done?");

  // Create one todo item.
  await newTodo.fill(TODO_ITEMS[0]);
  await newTodo.press("Enter");

  // Check that input is empty.
  await expect(newTodo).toBeEmpty();
});

test("should append new items to the bottom of the list", async ({
  page,
}) => {
  // Create 3 items.
  await createDefaultTodos(page);

  await expect(page.getByTestId("todo-title").nth(2)).toHaveText(
    TODO_ITEMS[2]
  );
});

async function createDefaultTodos(page) {
  // create a new todo locator
  const newTodo = page.getByPlaceholder("What needs to be done?");

  for (const item of TODO_ITEMS) {
    await newTodo.fill(item);
    await newTodo.press("Enter");
  }
}
