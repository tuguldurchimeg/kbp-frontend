"use client";

import * as React from "react";
import { DataTable } from "@/components/@issue/data-table";
import { useTranslations } from "next-intl";
import { ISSUEDATA } from "@/constants/kb-placeholder-data";
import { STATUS_MAP } from "@/constants/issue.constants";
import { StatusChart } from "@/components/@issue/status-chart";
import { PriorityChart } from "@/components/@issue/priority-chart";
import { UserChart } from "@/components/@issue/user-chart";

export default function Page() {
  const t = useTranslations("Main");

  // const totalIssues = ISSUEDATA.length;
  const totalPriorityHigh = ISSUEDATA.filter(
    (issue) => issue.attributes.priority === "high"
  ).length;
  const totalPriorityLow = ISSUEDATA.filter(
    (issue) => issue.attributes.priority === "low"
  ).length;

  const statusData = Object.entries(STATUS_MAP).map(([status, { label }]) => ({
    id: label,
    label,
    value: ISSUEDATA.filter((issue) => issue.attributes.status === status)
      .length,
  }));

  const priorityData = [
    { priority: t("high_priority"), count: totalPriorityHigh },
    { priority: t("low_priority"), count: totalPriorityLow },
  ];
  const userData = [
    { id: "1", firstname: "Dorj", lastname: "Tugulgur" },
    { id: "2", firstname: "Bat", lastname: "Bayr" },
  ];

  return (
    <main className="w-full px-6 space-y-8">
      <h2 className="text-xl font-semibold">{t("issues")}</h2>
      <DataTable />
      <section className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <UserChart data={userData} />
          <StatusChart data={statusData} />
          <PriorityChart data={priorityData} />
        </div>
      </section>
    </main>
  );
}
