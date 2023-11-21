import { Page } from "@playwright/test";

export const TODO_ITEMS = ["ngoding", "nugas", "pray"];

export const createTodo = async (page: Page, todos: string[]) => {
  const todoInput = page.getByPlaceholder("What needs to be done?");
  for (const item of todos) {
    await todoInput.click();
    await todoInput.fill(item);
    await todoInput.press("Enter");
  }
};
