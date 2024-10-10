import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";

export function OrderTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger>
            <Button variant="outline">
              <Search className="h-3 w-3" />
            </Button>
          </DialogTrigger>
          <OrderDetails />
        </Dialog>
      </TableCell>
      <TableCell>asf7a876sdasd</TableCell>
      <TableCell className="text-muted-foreground">Há 15 minutos</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400"></span>
          <span>Pendente</span>
        </div>
      </TableCell>
      <TableCell>José Luiz Guerra</TableCell>
      <TableCell>€ 130,00</TableCell>
      <TableCell>
        <Button variant="outline">
          <ArrowRight className="mr-2" /> Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost">
          <X /> Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
