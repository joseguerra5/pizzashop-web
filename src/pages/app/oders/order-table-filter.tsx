import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

export function OrderTableFilter() {
  return (
    <form action="" className="flex items-center gap-2">
      <span>Filtros:</span>
      <Input
        type="text"
        placeholder="Nome do cliente"
        id="customerName"
        className="w-[320px]"
      />
      <Input
        type="text"
        placeholder="Id do pedido"
        id="customerName"
        className="w-auto"
      />
      <Select defaultValue="all">
        <SelectTrigger className="h-8 w-[100px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todos status</SelectItem>
          <SelectItem value="pending">Pendente</SelectItem>
          <SelectItem value="canceled">Cancelado</SelectItem>
          <SelectItem value="processing">Em preparo</SelectItem>
          <SelectItem value="delivering">Em entrega</SelectItem>
          <SelectItem value="delivered">Entregue</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" variant="secondary" size="sm">
        <Search className="mr-2 h-4 w-4" /> Filtrar resultados
      </Button>

      <Button type="button" variant="outline" size="sm">
        <X className="mr-2 h-4 w-4" /> Remover filtros
      </Button>
    </form>
  );
}
