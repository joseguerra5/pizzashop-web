import { test, expect } from '@playwright/test';

test('sign in sucessfully', async ({ page }) => {
  await page.goto('/sign-in',  {waitUntil: "networkidle"});

  await page.getByPlaceholder('Seu e-mail').fill("jhondoe@example.com")
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  expect(page.getByText("enviamos um link de autenticação para seu e-mail")).toBeVisible()
});

test('sign in with wrong credential', async ({ page }) => {
  await page.goto('/sign-in',  {waitUntil: "networkidle"});

  await page.getByPlaceholder('Seu e-mail').fill("wrong@example.com")
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  expect(page.getByText("Credenciais invalidas")).toBeVisible()
});

test('navigate to new restaurant page', async ({ page }) => {
  await page.goto('/sign-in',  {waitUntil: "networkidle"});

  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

  expect(page.url()).toContain("/sign-up")
});

