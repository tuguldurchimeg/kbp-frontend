"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";
import { UserItem } from "@/types/user";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

type AssigneeData = {
  user: { data: UserItem };
  count: number;
};

type TickProps = {
  x?: number;
  y?: number;
  payload?: {
    value: string; // Assignee ID
  };
  payloadMap: Record<
    string,
    {
      id: string;
      avatar: string;
      firstname: string;
      lastname: string;
    }
  >;
};

export function UserChart({ data }: { data: AssigneeData[] }) {
  const t = useTranslations("Main");
  const chartData = (data ?? []).map(({ user, count }) => ({
    id: user.data.id,
    avatar: user.data.attributes?.avatar,
    firstname: user.data.attributes.firstname,
    lastname: user.data.attributes.lastname,
    count,
  }));

  const chartConfig = {
    count: {
      label: t("issue"),
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const CustomAvatarTick = (props: TickProps) => {
    const { x, y, payload } = props;
    const user = payload ? props.payloadMap?.[payload.value] : null;
    if (!user) return null;
    const displayName = `${user.lastname.slice(0, 2)}. ${user.firstname}`;

    return (
      <g transform={`translate(${x}, ${y})`}>
        <foreignObject x={-12} y={0} width={30} height={30}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center">
                <Avatar className="size-6">
                  <AvatarImage src={user.avatar} alt={displayName} />
                  <AvatarFallback>
                    {user.firstname[0]}
                    {user.lastname[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{displayName}</p>
            </TooltipContent>
          </Tooltip>
        </foreignObject>
      </g>
    );
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>{t("by_assignee")}</CardTitle>
      </CardHeader>
      <CardContent className="h-[130px] flex items-center justify-center">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="id"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={(props) => (
                <CustomAvatarTick
                  {...props}
                  payloadMap={chartData.reduce((acc, u) => {
                    acc[u.id] = u;
                    return acc;
                  }, {} as Record<string, (typeof chartData)[number]>)}
                />
              )}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-chart-2)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
