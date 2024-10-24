import { Helmet } from "react-helmet-async";
import { RevenueChart } from "./revenue-chart";
import { PopularProductsChart } from "./popular-products-chart";
import { DayOrdersAmountCard } from "./day-orders-amount-card";
import { MonthCanceledOrdersAmount } from "./month-canceled-orders-amount";
import { MonthRevenueCard } from "./month-revenue-card";
import { MonthOrdersAmount } from "./month-amount-orders-card";

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4 p-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrdersAmount />
          <DayOrdersAmountCard />
          <MonthCanceledOrdersAmount />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </>
  );
}
