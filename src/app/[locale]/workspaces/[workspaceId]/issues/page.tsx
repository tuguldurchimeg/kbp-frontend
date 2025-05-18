"use client";

import * as React from "react";
import { DataTable } from "@/components/@issue/data-table";
import { useTranslations } from "next-intl";
import { StatusChart } from "@/components/@issue/status-chart";
import { PriorityChart } from "@/components/@issue/priority-chart";
import { UserChart } from "@/components/@issue/user-chart";
import { getIssueChartDatas } from "@/src/app/lib/actions/issue.actions";
import { useParams } from "next/navigation";
import { ReportResponse } from "@/types/issue";
import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { FileQuestion, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Page() {
  const t = useTranslations();
  const params = useParams();
  const [data, setData] = React.useState<ReportResponse>();
  const [isLoading, setIsLoading] = React.useState(true);
  useEffect(() => {
    getIssueChartDatas({ workspace_id: params.workspaceId as string })
      .then((result) => {
        setData(result);
        setIsLoading(false);
      })
      .catch();
  }, [params.workspaceId]);

  if (isLoading) {
    return <div>{t("SYSCOMMON.loading")}</div>;
  }

  return (
    <main className="w-full px-6 space-y-6">
      <div className="flex justify-between">
        <Label className="text-xl font-semibold">
          <FileQuestion />
          {t("Main.issues")}
        </Label>
        <Tooltip>
          <TooltipTrigger>
            <Info className="size-5 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent side="bottom" align="end">
            <Label className="text-xs font-light">
              {t("Main.issues_description")}
            </Label>
          </TooltipContent>
        </Tooltip>
      </div>
      <section>
        {data && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <UserChart data={data.by_issue_assignee} />
            <StatusChart data={data.by_status} />
            <PriorityChart data={data.by_priority} />
          </div>
        )}
      </section>
      <DataTable />
    </main>
  );
}
