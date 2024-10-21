import { getMonthCanceledOrdersAmount } from "@/api/get-month-canceled-orders";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { MetricCardSkeleton } from "./metric-card-skeletom";

export function MonthCanceledOrdersAmount() {
  const { data: monthCanceledOrder } = useQuery({
    queryFn: getMonthCanceledOrdersAmount,
    queryKey: ["metrics", "month-canceled-orders-amount"],
  });
  return (
    <Card>
      <CardTitle className="flex flex-row justify-between p-4">
        Cancelamentos do mês
        <DollarSign />
      </CardTitle>
      <CardContent>
        {monthCanceledOrder ? (
          <>
            <h3 className="text-2xl font-bold">
              {monthCanceledOrder.amount.toLocaleString("pt")}
            </h3>
            <p>
              {monthCanceledOrder.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-green-600">
                    {monthCanceledOrder.diffFromLastMonth}%
                  </span>{" "}
                  m relação ao mês passado
                </>
              ) : (
                <>
                  <span className="text-red-600">
                    {monthCanceledOrder.diffFromLastMonth}%
                  </span>{" "}
                  em relação ao mês passado
                </>
              )}
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
