import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { DollarSign, ForkKnife } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { RevenueChart } from "./revenue-chart";
import { PopularProductsChart } from "./popular-products-chart";

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4 p-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardTitle className="flex flex-row justify-between p-4">
              Receita total do mës
              <DollarSign />
            </CardTitle>
            <CardContent>
              <h3 className="text-2xl font-bold">€ 5000,00</h3>
              <p>
                <span className="text-green-600">+2%</span> em relação ao mës
                passado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardTitle className="flex flex-row justify-between p-4">
              Pedidos(mës)
              <ForkKnife />
            </CardTitle>
            <CardContent className="flex flex-col gap-3">
              <h3 className="text-2xl font-bold">250</h3>
              <p>
                <span className="text-red-600">-5%</span> em relação ao mës
                passado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardTitle className="flex flex-row justify-between p-4">
              Pedidos (dia)
              <ForkKnife />
            </CardTitle>
            <CardContent>
              <h3 className="text-2xl font-bold">12</h3>
              <p>
                <span className="text-green-600">+2%</span> em relação ao mës
                passado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardTitle className="flex flex-row justify-between p-4">
              Cancelamentos do mës
              <DollarSign />
            </CardTitle>
            <CardContent>
              <h3 className="text-2xl font-bold">5</h3>
              <p>
                <span className="text-green-600">+2%</span> em relação ao mës
                passado
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </>
  );
}
