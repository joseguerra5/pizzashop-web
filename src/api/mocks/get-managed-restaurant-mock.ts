import { http, HttpResponse } from "msw";

import { GetManegedRestaurantResponse } from "../get-managed-restaurant";

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManegedRestaurantResponse
>("/metrics/daily-receipt-in-period", () => {
  return HttpResponse.json({
    createdAt: new Date("03/04/2024"),
    description: "criado com muito amor",
    id: "sauyhduyas",
    managerId: "sauyhduyas",
    name: "José Guerra",
    updatedAt: new Date("19/10/2024"),
  });
});
