"use client";

import { useEffect, useState } from "react";
import { WorkspaceItem } from "@/types/workspace";
import {
  getWorkspaces,
  updateWorkspace,
} from "@/src/app/lib/actions/workspace.actions";
import WorkspaceCard from "@/components/@workspace/workspace-card";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const WorkspaceCardList = () => {
  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const t = useTranslations("SYSCOMMON");
  const fetchWorkspaces = async () => {
    try {
      const data = await getWorkspaces();
      setWorkspaces(data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const handleWorkspaceUpdate = async (
    id: string,
    updatedValues: { name: string; description?: string; image_url?: string }
  ) => {
    try {
      await updateWorkspace({ id, params: updatedValues });
      setWorkspaces((prev) =>
        prev.map((ws) =>
          ws.id === id
            ? {
                ...ws,
                attributes: {
                  ...ws.attributes,
                  ...updatedValues,
                },
              }
            : ws
        )
      );
      toast.success(t("updated_successfully"));
    } catch {
      toast.error(t("update_failed"));
    }
  };

  if (loading) return <div>{t("loading")}</div>;
  if (workspaces.length === 0) return <div>{t("empty")}</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
        {workspaces.map((workspace) => (
          <WorkspaceCard
            key={workspace.id}
            item={workspace}
            onUpdate={handleWorkspaceUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkspaceCardList;
