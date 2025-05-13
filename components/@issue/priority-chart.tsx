"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTranslations } from "next-intl";
import { useStatusAndPriorityMaps } from "@/constants/issue.constants";
import { Cell } from "recharts";

type PriorityData = {
  priority: string;
  count: number;
};

export function PriorityChart({ data }: { data: PriorityData[] }) {
  const t = useTranslations("Main");
  const { PRIORITY_MAP } = useStatusAndPriorityMaps();

  const chartData = data.map((item) => ({
    priority: item.priority,
    count: item.count,
  }));

  const chartConfig = data.reduce((acc, item) => {
    const priority = PRIORITY_MAP[item.priority as keyof typeof PRIORITY_MAP];
    acc[item.priority] = {
      label: priority.label,
      color: priority.chartColor,
    };
    return acc;
  }, {} as ChartConfig);
  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="text-sm text-center">
          {t("by_priority")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="priority"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label ??
                value.toString()
              }
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" layout="vertical" radius={5}>
              {chartData.map((entry) => (
                <Cell
                  key={`bar-${entry.priority}`}
                  fill={chartConfig[entry.priority]?.color}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
