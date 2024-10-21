import { http, HttpResponse } from "msw";

import { GetPopularProductResponse } from "../get-popular-products";

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductResponse
>("/metrics/popular-products", () => {
  return HttpResponse.json([
    { amount: 20, product: "Banana" },
    { amount: 10, product: "maçã" },
    { amount: 16, product: "pera" },
    { amount: 11, product: "uva" },
    { amount: 5, product: "jaca" },
  ]);
});
