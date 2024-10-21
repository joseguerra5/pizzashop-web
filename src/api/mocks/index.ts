import { env } from "@/env";
import { setupWorker } from "msw/browser";
import { signInMock } from "@/api/mocks/sign-in-mock";
import { registerRestaurantMock } from "./register-restaurant.mock";
import { getDayOrdersAmountMock } from "./get-day-orders-amount-mock";
import { getMonthAmountMock } from "./get-month-orders-amount-mock";
import { getMonthCanceledOrdersMock } from "./get-month-canceled-mock";
import { getDailyRevenueInPeriodMock } from "./get-daily-revenue-in-period-mock";
import { getPopularProductsMock } from "./get-popular-products-mock";

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getDayOrdersAmountMock,
  getMonthAmountMock,
  getMonthCanceledOrdersMock,
  getDailyRevenueInPeriodMock,
  getPopularProductsMock,
);

export async function enableMSW() {
  if (env.MODE !== "test") {
    return;
  }
  await worker.start();
}
