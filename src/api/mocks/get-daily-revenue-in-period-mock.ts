import { http, HttpResponse } from "msw";

import { GetDailyRevenueResponse } from "../get-daily-revenue-in-period";

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueResponse
>("/metrics/daily-receipt-in-period", () => {
  return HttpResponse.json([
    { date: "01/10/2024", receipt: 2000 },
    { date: "02/10/2024", receipt: 3000 },
    { date: "03/10/2024", receipt: 1000 },
    { date: "04/10/2024", receipt: 900 },
    { date: "05/10/2024", receipt: 3000 },
    { date: "06/10/2024", receipt: 2300 },
    { date: "07/10/2024", receipt: 1100 },
  ]);
});
