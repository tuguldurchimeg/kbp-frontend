"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { FolderOpen } from "lucide-react";
import DocumentCard from "@/components/@documents/document-card";
import {
  getWorkspace,
  updateWorkspace,
} from "@/src/app/lib/actions/workspace.actions";
import { WorkspaceItem } from "@/types/workspace";
import WorkspaceSummary from "@/components/@workspace/summary-chart";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function WorkspaceDetailPage() {
  const params = useParams();
  const id = params.workspaceId;
  const [workspace, setWorkspace] = useState<WorkspaceItem | null>(null);
  const t = useTranslations();
  const fetchWorkspace = useCallback(async () => {
    if (!id || typeof id !== "string") return;
    try {
      const data = await getWorkspace(id);
      setWorkspace(data);
    } catch (error) {
      console.error("Failed to load workspace", error);
    }
  }, [id]);

  useEffect(() => {
    fetchWorkspace();
  }, [fetchWorkspace]);

  const handleWorkspaceUpdate = async (updatedValues: {
    name: string;
    description?: string;
  }) => {
    if (!workspace) return;
    try {
      await updateWorkspace({
        id: workspace.id,
        params: updatedValues,
      });
      toast.success(t("SYSCOMMON.updated_successfully"));
      fetchWorkspace();
    } catch {
      toast.error(t("SYSCOMMON.update_failed"));
    }
  };

  if (!workspace) {
    return <p className="p-6">{t("SYSCOMMON.loading")}</p>;
  }

  const uncategorizedDocuments = workspace.attributes.documents?.data || [];
  const categories = workspace.attributes.categories?.data || [];

  return (
    <main className="flex flex-col gap-10 px-4 w-full mx-auto max-w-7xl">
      <WorkspaceSummary
        workspace={workspace}
        onUpdateWorkspace={handleWorkspaceUpdate}
      />

      <section className="space-y-12">
        {uncategorizedDocuments.length > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {uncategorizedDocuments.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
              ))}
            </div>
          </div>
        )}

        {categories.map((category) => (
          <div key={category.id} className="space-y-4">
            <h3 className="text-lg font-semibold text-muted-foreground flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              {category.attributes.name}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {category.attributes.documents?.data.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
