import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@radix-ui/react-label";
import { ArrowRight, Search, X } from "lucide-react";
import { Helmet } from "react-helmet-async";

export function Oders() {
  return <>
    <Helmet title="Pedidos" />
    <div className="flex flex-col gap-4 px-8 py-4">
      <h1 className="text-3xl font-bold">Pedidos</h1>
      <form action="" className="flex items-center gap-2">
        <Label htmlFor="customerName">Filtros:</Label>
        <Input type="text" placeholder="Nome do cliente" id="customerName" className="w-36"/>
      </form>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[64px]"></TableHead>
              <TableHead className="w-[140px]">Identificador</TableHead>
              <TableHead className="w-[180px]">Realizado há</TableHead>
              <TableHead className="w-[140px]">Status</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead className="w-[140px]">Total do pedido</TableHead>
              <TableHead className="w-[164px]"></TableHead>
              <TableHead className="w-[132px]"></TableHead>
            </TableRow>
          </TableHeader>
            <TableBody>
              {Array.from({length: 10}).map((_, i) => {
                return (
                  <TableRow key={i}>
                      <TableCell><Button variant="outline" ><Search className="h-3 w-3"/></Button></TableCell>
                      <TableCell>asf7a876sdasd</TableCell>
                      <TableCell className="text-muted-foreground">Há 15 minutos</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                          <span>Pendente</span>
                        </div>
                      </TableCell>
                      <TableCell>José Luiz Guerra</TableCell>
                      <TableCell>€ 130,00</TableCell>
                      <TableCell><Button variant="outline" ><ArrowRight className="mr-2"/> Aprovar</Button></TableCell>
                      <TableCell>
                        <Button variant="ghost"><X/> Cancelar</Button>
                      </TableCell>
                   </TableRow>
                )
              })}
            </TableBody>
        </Table>
      </div>
      
    </div>
  </>
}