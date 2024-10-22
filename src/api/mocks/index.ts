import { env } from "@/env";
import { setupWorker } from "msw/browser";
import { signInMock } from "@/api/mocks/sign-in-mock";
import { registerRestaurantMock } from "./register-restaurant-mock";
import { getDayOrdersAmountMock } from "./get-day-orders-amount-mock";
import { getMonthAmountMock } from "./get-month-orders-amount-mock";
import { getMonthCanceledOrdersMock } from "./get-month-canceled-mock";
import { getDailyRevenueInPeriodMock } from "./get-daily-revenue-in-period-mock";
import { getPopularProductsMock } from "./get-popular-products-mock";
import { getProfileMock } from "./get-profile-mock";
import { updateProfileMock } from "./update-profile-mock";
import { getOrdersMock } from "./get-orders-mock";
import { getOrderDetailsMock } from "./get-orders-details-mock";
import { approveOrderMock } from "./approve-order.mock";
import { deliverOrderMock } from "./deliver-order-mock";
import { dispatchOrderMock } from "./dispatch-order.-mock";
import { cancelOrderMock } from "./cancel-order-mock";
import { getMonthRevenueMock } from "./get-month-revenue-mock";


export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getDayOrdersAmountMock,
  getMonthAmountMock,
  getMonthCanceledOrdersMock,
  getDailyRevenueInPeriodMock,
  getPopularProductsMock,
  getProfileMock,
  updateProfileMock,
  getOrdersMock,
  getOrderDetailsMock,
  approveOrderMock,
  deliverOrderMock,
  dispatchOrderMock,
  cancelOrderMock,
  getMonthRevenueMock,
);

export async function enableMSW() {
  if (env.MODE !== "test") {
    return;
  }
  await worker.start();
}
