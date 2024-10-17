import { getOrderDetails } from "@/api/get-order-details";
import { OrderStatus } from "@/components/order-status";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import { OrderDetailSkeleton } from "./order-detail-skeleton";

export interface OrderDetailsProps {
  orderId: string
  open: boolean
}

export function OrderDetails({orderId, open}: OrderDetailsProps) {
  const {data: order} = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderDetails({orderId}),
    //a query so é feita quando o enabled for true, e so vira true quando o estado do OrderDetail é aberto com o open
    enabled: open
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl">Pedido: {orderId}</DialogTitle>
        <DialogDescription className="text-muted-foreground">
          Detalhes do pedido
        </DialogDescription>
      </DialogHeader>

      {order ? (
        <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow className="flex items-center justify-between">
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell>
                <OrderStatus status={order.status}/>
              </TableCell>
            </TableRow>

            <TableRow className="flex items-center justify-between">
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell>{order.customer.name}</TableCell>
            </TableRow>

            <TableRow className="flex items-center justify-between">
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell>{order.customer.phone ?? "Não informado"}</TableCell>
            </TableRow>

            <TableRow className="flex items-center justify-between">
              <TableCell className="text-muted-foreground">E-mail</TableCell>
              <TableCell>{order.customer.email}</TableCell>
            </TableRow>

            <TableRow className="flex items-center justify-between">
              <TableCell className="text-muted-foreground">
                Realizado há
              </TableCell>
              <TableCell>
                {formatDistanceToNow(new Date(order.createdAt), {
                  locale: pt,
                  addSuffix: true
                })}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableHead>Produto</TableHead>
            <TableHead>Qtd.</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Subtotal</TableHead>
          </TableHeader>
          <TableBody>

            {order.orderItems.map(item => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{(item.priceInCents / 100).toLocaleString("pt", {
                    style: "currency",
                    currency: "EUR"
                  })}</TableCell>
                  <TableCell>{(item.priceInCents * item.quantity / 100).toLocaleString("pt", {
                    style: "currency",
                    currency: "EUR"
                  })}</TableCell>
                </TableRow>
              )
            })}

          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do pedido</TableCell>
              <TableCell>{(order.totalInCents / 100).toLocaleString("pt", {
                    style: "currency",
                    currency: "EUR"
                  })}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      ) :
      (
        <OrderDetailSkeleton/>
      )}
    </DialogContent>
  );
}
