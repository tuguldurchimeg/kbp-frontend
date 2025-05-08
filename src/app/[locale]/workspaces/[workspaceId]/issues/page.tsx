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

export default function Page() {
  const t = useTranslations("Main");
  const userData = [
    { id: "1", firstname: "Dorj", lastname: "Tugulgur" },
    { id: "2", firstname: "Bat", lastname: "Bayr" },
  ];
  const params = useParams();
  const [data, setData] = React.useState<ReportResponse>();
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    getIssueChartDatas({ workspace_id: params.workspaceId as string })
      .then((result) => {
        setData(result);
        setIsLoading(false);
      })
      .catch();
  }, [params.workspaceId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="w-full px-6 space-y-8">
      <h2 className="text-xl font-semibold">{t("issues")}</h2>
      <DataTable />
      <section className="space-y-6">
        {data && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <UserChart data={userData} />
            <StatusChart data={data} />
            <PriorityChart data={data} />
          </div>
        )}
      </section>
    </main>
  );
}
