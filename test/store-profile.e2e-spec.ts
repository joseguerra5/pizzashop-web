import { test, expect } from '@playwright/test';

test('update profile successfully', async ({ page }) => {
  await page.goto('/',  {waitUntil: "networkidle"});

  await page.getByLabel('Seu restaurante').fill("Pizza shop")

  await page.getByLabel('Seu nome').fill("Jhon Doe")

  await page.getByLabel('Seu e-mail').fill("jhondoe@example.com")

  await page.getByLabel('Seu celular').fill("312312")

  await page.getByRole('button', { name: 'Registrar restaurante' }).click()

  expect(page.getByText("Restaurante cadastrado com sucesso")).toBeVisible()
});
