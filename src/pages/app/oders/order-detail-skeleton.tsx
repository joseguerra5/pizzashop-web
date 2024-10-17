import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";



export function OrderDetailSkeleton() {
    return (
      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow className="flex items-center justify-between">
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[110px]"/>
              </TableCell>
            </TableRow>

            <TableRow className="flex items-center justify-between">
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell><Skeleton className="h-4 w-[210px]"/></TableCell>
            </TableRow>

            <TableRow className="flex items-center justify-between">
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell><Skeleton className="h-4 w-[210px]"/></TableCell>
            </TableRow>

            <TableRow className="flex items-center justify-between">
              <TableCell className="text-muted-foreground">E-mail</TableCell>
              <TableCell><Skeleton className="h-4 w-[210px]"/></TableCell>
            </TableRow>

            <TableRow className="flex items-center justify-between">
              <TableCell className="text-muted-foreground">
                Realizado há
              </TableCell>
              <TableCell>
              <Skeleton className="h-4 w-[110px]"/>
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
                <TableRow>
                  <TableCell><Skeleton className="h-4 w-[120px]"/></TableCell>
                  <TableCell><Skeleton className="h-4 w-[70px]"/></TableCell>
                  <TableCell><Skeleton className="h-4 w-[70px]"/></TableCell>
                  <TableCell><Skeleton className="h-4 w-[70px]"/></TableCell>
                </TableRow>
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do pedido</TableCell>
              <TableCell><Skeleton className="h-4 w-[70px]"/></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    )
}