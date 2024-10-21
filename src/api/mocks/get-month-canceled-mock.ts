import { http, HttpResponse } from "msw";

import { GetMonthCanceledOrdersAmountResponse } from "../get-month-canceled-orders";

export const getMonthCanceledOrdersMock = http.get<
  never,
  never,
  GetMonthCanceledOrdersAmountResponse
>("/metrics/month-canceled-orders-amount", () => {
  return HttpResponse.json({
    amount: 200,
    diffFromLastMonth: 2,
  });
});
