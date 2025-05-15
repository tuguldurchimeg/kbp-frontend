"use client";

import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { WorkspaceItem } from "@/types/workspace";
import { useTranslations } from "next-intl";
import WorkspaceEditForm from "./workspace-edit-form";

export default function WorkspaceSummary({
  workspace,
  onUpdateWorkspace,
}: {
  workspace: WorkspaceItem;
  onUpdateWorkspace: (values: { name: string; description?: string }) => void;
}) {
  const t = useTranslations("Workspace");

  const categories = workspace.attributes.categories?.data;
  const categoryDocsCount = categories?.reduce((sum, cat) => {
    const docs = cat.attributes.documents?.data ?? [];
    return sum + docs.length;
  }, 0);

  const workspaceDocsCount = workspace.attributes.documents?.data?.length ?? 0;
  const totalDocs = (categoryDocsCount ?? 0) + workspaceDocsCount;

  const issues = workspace.attributes.issues?.data;
  const applyAlpha = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  return (
    <Card>
      <CardContent className="flex flex-wrap sm:items-center sm:justify-between gap-6 sm:gap-10 p-4 sm:p-6">
        <div className="flex flex-col">
          <CardTitle className="text-xl sm:text-2xl">
            {workspace.attributes.name}
            <WorkspaceEditForm
              workspace={workspace}
              onSubmit={onUpdateWorkspace}
            />
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {workspace.attributes.description}
          </CardDescription>
        </div>

        <div className="flex flex-col items-start sm:items-center">
          <p className="text-sm text-muted-foreground">
            {t("total_categories")}
          </p>
          <p className="text-2xl font-bold">{categories?.length}</p>
        </div>

        <div className="flex flex-col items-start sm:items-center">
          <p className="text-sm text-muted-foreground">
            {t("total_documents")}
          </p>
          <p className="text-2xl font-bold">{totalDocs}</p>
        </div>

        <div className="flex flex-col items-start sm:items-center">
          <p className="text-sm text-muted-foreground">{t("total_issues")}</p>
          <p className="text-2xl font-bold">{issues?.length}</p>
        </div>
      </CardContent>
    </Card>
  );
}
