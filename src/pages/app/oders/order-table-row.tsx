import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "@/components/order-status";
import { formatDistanceToNow} from "date-fns"
import { pt } from "date-fns/locale"
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancel-order";
import { GetOrdersResponse } from "@/api/get-orders";
import { approveOrder } from "@/api/approve-order";
import { dispatchOrder } from "@/api/dispatch-order";
import { deliverOrder } from "@/api/deliver-order";

export interface OrderTableRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  };
}

export function OrderTableRow({order}: OrderTableRowProps) {

  //virou controlled component com o controle a partir do estado
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
     //busca todas as queryKey qye contenha orders
     const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ["orders"]
    })
    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map(order => {
          if (order.orderId === orderId) {
            return {...order, status}
          }
          return order
        })
      })
    })
  }

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder} = useMutation({
    mutationFn: approveOrder,
    async onSuccess(_, {orderId}) {
      updateOrderStatusOnCache(orderId, "processing")
    } 
  })

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder} = useMutation({
    mutationFn: cancelOrder,
    async onSuccess(_, {orderId}) {
      updateOrderStatusOnCache(orderId, "canceled")
    } 
  })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder} = useMutation({
    mutationFn: dispatchOrder,
    async onSuccess(_, {orderId}) {
      updateOrderStatusOnCache(orderId, "delivering")
    } 
  })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder} = useMutation({
    mutationFn: deliverOrder,
    async onSuccess(_, {orderId}) {
      updateOrderStatusOnCache(orderId, "delivered")
    } 
  })
  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger>
            <Button variant="outline">
              <Search className="h-3 w-3" />
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={order.orderId} open={isDetailsOpen}/>
        </Dialog>
      </TableCell>
      <TableCell>{order.orderId}</TableCell>
      <TableCell className="text-muted-foreground">{formatDistanceToNow(new Date(order.createdAt), {
        locale: pt,
        addSuffix: true
      })}</TableCell>
      <TableCell>
       <OrderStatus status={order.status}/>
      </TableCell>
      <TableCell>{order.customerName}</TableCell>
      <TableCell>{(order.total / 100).toLocaleString("pt", {
        style: "currency",
        currency: "EUR"
      })}</TableCell>
      <TableCell>

        {order.status === "pending" && (
            <Button variant="outline" onClick={() => approveOrderFn({orderId: order.orderId})} disabled={isApprovingOrder}>
              <ArrowRight className="mr-2" /> Aprovar
            </Button>
        )}

        {order.status === "processing" && (
                    <Button variant="outline" onClick={() => dispatchOrderFn({orderId: order.orderId})} disabled={isDispatchingOrder}>
                      <ArrowRight className="mr-2" /> Em entrega
                    </Button>
                )}

        {order.status === "delivering" && (
                    <Button variant="outline" onClick={() => deliverOrderFn({orderId: order.orderId})} disabled={isDeliveringOrder}>
                      <ArrowRight className="mr-2" /> Entregue
                    </Button>
                )}

      </TableCell>
      <TableCell>
        <Button disabled={!["pending", "processing"].includes(order.status) || isCancelingOrder} variant="ghost" onClick={() => cancelOrderFn({orderId: order.orderId})}>
          <X /> Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
