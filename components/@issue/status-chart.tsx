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
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--color-chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--color-chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--color-chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--color-chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--color-chart-5)",
  },
} satisfies ChartConfig;

interface StatusData {
  id: string;
  label: string;
  value: number;
}

export function StatusChart({ data }: { data: StatusData[] }) {
  console.log("status data ", data);
  const t = useTranslations("Main");
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
              dataKey="visitors"
              nameKey="browser"
              innerRadius={40}
              outerRadius={65}
              strokeWidth={5}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm"></CardFooter> */}
    </Card>
  );
}
