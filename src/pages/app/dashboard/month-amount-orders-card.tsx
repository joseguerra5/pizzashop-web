import { getMonthOrdersAmount } from "@/api/get-month-orders-amounth";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ForkKnife } from "lucide-react";
import { MetricCardSkeleton } from "./metric-card-skeletom";

export function MonthOrdersAmount() {
  const { data: monthOrdersAmount } = useQuery({
    queryFn: getMonthOrdersAmount,
    queryKey: ["metrics", "month-orders-amount"],
  });
  return (
    <Card>
      <CardTitle className="flex flex-row justify-between p-4">
        Pedidos (mês)
        <ForkKnife />
      </CardTitle>
      <CardContent>
        {monthOrdersAmount ? (
          <>
            <h3 className="text-2xl font-bold">
              {monthOrdersAmount.amount.toLocaleString("pt")}
            </h3>
            <p>
              {monthOrdersAmount.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-green-600">
                    {monthOrdersAmount.diffFromLastMonth}%
                  </span>{" "}
                  em relação a ontem
                </>
              ) : (
                <>
                  <span className="text-red-600">
                    {monthOrdersAmount.diffFromLastMonth}%
                  </span>{" "}
                  em relação a ontem
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
