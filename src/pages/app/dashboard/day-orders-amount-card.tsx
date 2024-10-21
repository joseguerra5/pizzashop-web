import { getDayOrdersAmount } from "@/api/get-day-orders-amount";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ForkKnife } from "lucide-react";
import { MetricCardSkeleton } from "./metric-card-skeletom";

export function DayOrdersAmountCard() {
  const { data: dayOrdersAmount } = useQuery({
    queryFn: getDayOrdersAmount,
    queryKey: ["metrics", "day-orders-amount"],
  });
  return (
    <Card>
      <CardTitle className="flex flex-row justify-between p-4">
        Pedidos (dia)
        <ForkKnife />
      </CardTitle>
      <CardContent>
        {dayOrdersAmount ? (
          <>
            <h3 className="text-2xl font-bold">
              {dayOrdersAmount.amount.toLocaleString("pt")}
            </h3>
            <p>
              {dayOrdersAmount.diffFromYesterday >= 0 ? (
                <>
                  <span className="text-green-600">
                    {dayOrdersAmount.diffFromYesterday}%
                  </span>{" "}
                  em relação a ontem
                </>
              ) : (
                <>
                  <span className="text-red-600">
                    {dayOrdersAmount.diffFromYesterday}%
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
