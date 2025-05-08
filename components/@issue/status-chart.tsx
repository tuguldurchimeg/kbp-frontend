"use client";

import * as React from "react";
import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTranslations } from "next-intl";
import { ReportResponse } from "@/types/issue";
import { useStatusAndPriorityMaps } from "@/constants/issue.constants";

export function StatusChart({ data }: { data: ReportResponse }) {
  const t = useTranslations("Main");
  const { STATUS_MAP } = useStatusAndPriorityMaps();

  const chartData = data.by_status.map((item) => ({
    status: item.status,
    count: item.count,
  }));

  const chartConfig = data.by_status.reduce((acc, item) => {
    const status = STATUS_MAP[item.status as keyof typeof STATUS_MAP];
    acc[item.status] = {
      label: status.label,
      color: status.color,
    };
    return acc;
  }, {} as ChartConfig);
  console.log("chartconfig ", chartConfig);

  return (
    <Card className="gap-3">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-sm text-center">{t("by_status")}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-[130px] h-[130px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={40}
              outerRadius={65}
              strokeWidth={5}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
