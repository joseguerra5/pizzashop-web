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

export function RevenueChart() {
  const {data: dailyRevenue} = useQuery({
    queryFn: getDailyRevenue,
    queryKey: ["metrics", "daily-revenue-in-period"]
  })

  return (
    <Card className="col-span-6">
      <CardHeader>
        <CardTitle>Receita do pedido</CardTitle>
        <CardDescription>Receita diária no período</CardDescription>
      </CardHeader>
      <CardContent>
       {dailyRevenue && (
         <ResponsiveContainer width="100%" height={240}>
         <LineChart data={dailyRevenue} style={{ fontSize: 12 }}>
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
       )}
      </CardContent>
    </Card>
  );
}
