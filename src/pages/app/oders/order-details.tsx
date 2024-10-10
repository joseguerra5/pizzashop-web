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

export function OrderDetails() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl">Pedido: asu12341ayud4duo</DialogTitle>
        <DialogDescription className="text-muted-foreground">
          Detalhes do pedido
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow className="flex items-center justify-between">
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell>
                <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                <span>Pendente</span>
              </TableCell>
            </TableRow>

            <TableRow className="flex items-center justify-between">
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell>José Luiz Guerra</TableCell>
            </TableRow>

            <TableRow className="flex items-center justify-between">
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell>910 000 123</TableCell>
            </TableRow>

            <TableRow className="flex items-center justify-between">
              <TableCell className="text-muted-foreground">E-mail</TableCell>
              <TableCell>luisvitorioguerra@hotmail.com</TableCell>
            </TableRow>

            <TableRow className="flex items-center justify-between">
              <TableCell className="text-muted-foreground">
                Realizado há
              </TableCell>
              <TableCell>Há 3 minutos</TableCell>
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
            <TableRow>
              <TableCell>Pizza Pepperoni Familia</TableCell>
              <TableCell>2</TableCell>
              <TableCell>€ 69,90</TableCell>
              <TableCell>€ 139,80</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Pizza Mussarela Familia</TableCell>
              <TableCell>2</TableCell>
              <TableCell>€ 59,90</TableCell>
              <TableCell>€ 119,80</TableCell>
            </TableRow>
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do pedido</TableCell>
              <TableCell>€ 259,60</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  );
}
