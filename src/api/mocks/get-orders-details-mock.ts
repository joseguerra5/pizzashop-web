import { http, HttpResponse } from "msw";
import { GetOrderDetailsResponse, GetOrderDetailsParams } from "../get-order-details";


export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>("/orders/:orderId", ({params}) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      email: "jhondoe@example.com",
      name: "jhon doe",
      phone: "910848448",
    },
    totalInCents: 50000,
    createdAt: new Date().toISOString(),
    status: "pending",
    orderItems: [
      {id: "order-item-1", priceInCents: 10000, product: {
        name: "pizza"
      }, quantity: 1,},
      {id: "order-item-1", priceInCents: 40000, product: {
        name: "pizza"
      }, quantity: 1,}
    ]

  });
});
