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

  const { mutateAsync: cancelOrderFn } = useMutation({
    mutationFn: cancelOrder,
    async onSuccess(_, {orderId}) {
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
              return {...order, status: "canceled"}
            }
            return order
          })
        })
      })
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
      <TableCell className="text-muted-foreground">{formatDistanceToNow(order.createdAt, {
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
        <Button variant="outline">
          <ArrowRight className="mr-2" /> Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button disabled={!["pending", "processing"].includes(order.status)} variant="ghost" onClick={() => cancelOrderFn({orderId: order.orderId})}>
          <X /> Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
