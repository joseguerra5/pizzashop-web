export type OrderStatus =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";

interface OrderStatusProps {
  status: OrderStatus;
}

//o Record<OrderStatus, string>: Esta parte define o tipo da constante. O tipo Record<KeyType, ValueType> é uma utilidade do TypeScript que cria um objeto com chaves do tipo KeyType e valores do tipo ValueType. Neste caso:
//OrderStatus é uma chave enum e o string é o valor do objeto(string), A constante armazena as traduções de diferentes status do pedido
const orderStatusMap: Record<OrderStatus, string> = {
  pending: "Pendente",
  canceled: "Cancelado",
  delivered: "Entregue",
  delivering: "Em entrega",
  processing: "Em preparo",
};
export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === "pending" && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-slate-400"
        ></span>
      )}

      {status === "canceled" && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-rose-600"
        ></span>
      )}
      {status === "delivered" && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-emerald-500"
        ></span>
      )}
      {["delivering", "processing"].includes(status) && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-amber-500"
        ></span>
      )}
      <span>{orderStatusMap[status]}</span>
    </div>
  );
}
