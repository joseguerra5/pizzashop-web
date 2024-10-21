import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import color from "tailwindcss/colors";

import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
} from "recharts";
import colors from "tailwindcss/colors";
import { getDailyRevenue } from "@/api/get-daily-revenue-in-period";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { Loader2 } from "lucide-react";

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    //subDays pega a data atual e subtrai 7 dias
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const { data: dailyRevenue } = useQuery({
    queryFn: () =>
      getDailyRevenue({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
    queryKey: ["metrics", "daily-revenue-in-period", dateRange],
  });

  const chartData = useMemo(() => {
    return dailyRevenue?.map((chartItem) => {
      return {
        date: chartItem.date,
        receipt: chartItem.receipt / 100,
      };
    });
  }, [dailyRevenue]);

  return (
    <Card className="col-span-6">
      <CardHeader className="flex flex-row justify-between">
        <div className="space-y-1">
          <CardTitle>Receita do pedido</CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>
      <CardContent>
        {chartData ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} style={{ fontSize: 12 }}>
              <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) =>
                  value.toLocaleString("pt", {
                    style: "currency",
                    currency: "EUR",
                  })
                }
              />
              <CartesianGrid vertical={false} className="stroke-muted" />
              <Line
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
                stroke={colors.violet["500"]}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
