import { getPopularProducts } from "@/api/get-popular-products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

import { ResponsiveContainer, Pie, PieChart, Cell } from "recharts";
import { amber, violet, sky, emerald, rose } from "tailwindcss/colors";


const COLORS = [sky[500], amber[500], violet[500], emerald[500], rose[500]];

export function PopularProductsChart() {

  const {data: popularProducts} = useQuery({
    queryFn: getPopularProducts,
    queryKey: ["metrics", "popular-products"]
  })
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Produtos populares</CardTitle>
      </CardHeader>
      <CardContent>
        {popularProducts && (
                 <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={popularProducts}
                      dataKey="amount"
                      nameKey="product"
                      cx="50%"
                      cy="50%"
                      outerRadius={86}
                      innerRadius={64}
                      strokeWidth={8}
                      labelLine={false}
                      label={({
                        cx,
                        cy,
                        midAngle,
                        innerRadius,
                        outerRadius,
                        value,
                        index,
                      }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = 12 + innerRadius + (outerRadius - innerRadius);
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
                        return (
                          <text
                            x={x}
                            y={y}
                            className="fill-muted-foreground text-xs"
                            textAnchor={x > cx ? "start" : "end"}
                            dominantBaseline="central"
                          >
                            {popularProducts[index].product.length > 12
                              ? popularProducts[index].product.substring(0, 12).concat("...")
                              : popularProducts[index].product}{" "}
                            ({value})
                          </text>
                        );
                      }}
                    >
                      {popularProducts.map((_, index) => {
                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index]}
                            className="stroke-background"
                          />
                        );
                      })}
                    </Pie>
                  </PieChart>
               </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
