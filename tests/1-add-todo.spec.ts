import { test, expect } from "@playwright/test";
import { createTodo, TODO_ITEMS } from "./variables";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

test("should allow me to add todo items", async ({ page }) => {
  await createTodo(page, TODO_ITEMS.slice(0, 1));
});

test("should clear text input field when an item is added", async ({
  page,
}) => {});

test("should append new items to the bottom of the list", async ({
  page,
}) => {});
