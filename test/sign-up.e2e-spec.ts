import { test, expect } from '@playwright/test';

test('sign up sucessfully', async ({ page }) => {
  await page.goto('/sign-up',  {waitUntil: "networkidle"});

  await page.getByLabel('Seu restaurante').fill("Pizza shop")

  await page.getByLabel('Seu nome').fill("Jhon Doe")

  await page.getByLabel('Seu e-mail').fill("jhondoe@example.com")

  await page.getByLabel('Seu celular').fill("312312")

  await page.getByRole('button', { name: 'Registrar restaurante' }).click()

  expect(page.getByText("Restaurante cadastrado com sucesso")).toBeVisible()
});

test('sign up with error', async ({ page }) => {
  await page.goto('/sign-up',  {waitUntil: "networkidle"});

  await page.getByLabel('Seu restaurante').fill("Invalid Name")

  await page.getByLabel('Seu nome').fill("Jhon Doe")

  await page.getByLabel('Seu e-mail').fill("jhondoe@example.com")

  await page.getByLabel('Seu celular').fill("312312")

  await page.getByRole('button', { name: 'Registrar restaurante' }).click()

  expect(page.getByText("Erro ao cadastrar restaurante")).toBeVisible()
});


