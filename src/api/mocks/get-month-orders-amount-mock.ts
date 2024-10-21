import { http, HttpResponse } from "msw";

import { GetMonthOrdersAmountResponse } from "../get-month-orders-amounth";

export const getMonthAmountMock = http.get<
  never,
  never,
  GetMonthOrdersAmountResponse
>("/metrics/month-orders-amount", () => {
  return HttpResponse.json({
    amount: 10000,
    diffFromLastMonth: -2,
  });
});
