
import { getMonthRevenue } from "@/api/get-month-revenue";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { MetricCardSkeleton } from "./metric-card-skeletom";

export function MonthRevenueCard() {
  const {data: monthRevenue} = useQuery({
    queryFn: getMonthRevenue,
    queryKey: ["metrics", "month-receipt"]
  })
  return (
    <Card>
            <CardTitle className="flex flex-row justify-between p-4">
            Receita total do mês
            <DollarSign />
            </CardTitle>
            <CardContent>
            {monthRevenue ? (
        <>
           <h3 className="text-2xl font-bold">{(monthRevenue.receipt / 100).toLocaleString("pt", {
            style: "currency",
            currency: "EUR"
           })}</h3>
           <p>
            {monthRevenue.diffFromLastMonth >= 0 ? (
              <>
                <span className="text-green-600">{monthRevenue.diffFromLastMonth}%</span> m relação ao mês passado
              </>
            ) : (
              <>
                <span className="text-red-600">{monthRevenue.diffFromLastMonth}%</span> em relação ao mês passado
              </>
            )}
           </p>
        </>
        ) : (
          <MetricCardSkeleton />
        )}
        </CardContent>
      </Card>
  )
}