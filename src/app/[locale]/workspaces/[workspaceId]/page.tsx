"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { FolderOpen, Tag } from "lucide-react";
import DocumentCard from "@/components/@documents/document-card";
import {
  getWorkspace,
  updateWorkspace,
} from "@/src/app/lib/actions/workspace.actions";
import { WorkspaceItem } from "@/types/workspace";
import WorkspaceSummary from "@/components/@workspace/workspace-overview";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";

export default function WorkspaceDetailPage() {
  const params = useParams();
  const id = params.workspaceId;
  const [workspace, setWorkspace] = useState<WorkspaceItem | null>(null);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const t = useTranslations();

  const fetchWorkspace = useCallback(
    async (tagIds: string[] = []) => {
      if (!id || typeof id !== "string") return;
      try {
        const filters = tagIds.length > 0 ? { tag_ids: tagIds } : {};
        const data = await getWorkspace(id, filters);
        setWorkspace(data);
      } catch (error) {
        console.error("Failed to load workspace", error);
      }
    },
    [id]
  );

  useEffect(() => {
    fetchWorkspace(selectedTagIds);
  }, [fetchWorkspace, selectedTagIds]);

  // const toggleTag = (tagId: string) => {
  //   setSelectedTagIds((prev) =>
  //     prev.includes(tagId)
  //       ? prev.filter((id) => id !== tagId)
  //       : [...prev, tagId]
  //   );
  // };

  const clearTags = () => {
    setSelectedTagIds([]);
  };

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
  const tags = workspace.attributes.tags?.data;
  const applyAlpha = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <main className="flex flex-col  px-4 w-full mx-auto max-w-7xl">
      <WorkspaceSummary
        workspace={workspace}
        onUpdateWorkspace={handleWorkspaceUpdate}
      />
      <section className="mt-4 mb-10">
        <Label className="text-xs text-muted-foreground mb-1">
          <Tag className="size-3" />
          {t("Tags.title")}
        </Label>
        <ToggleGroup
          type="multiple"
          className="flex flex-wrap gap-2"
          value={selectedTagIds}
          onValueChange={(value) => {
            // Prevent accidental inclusion of "__all__"
            if (value.includes("__all__")) return;
            setSelectedTagIds(value);
          }}
        >
          <ToggleGroupItem
            value="__all__"
            className={clsx(
              "text-sm font-medium rounded-lg px-6 py-0 border-2",
              selectedTagIds.length === 0 && "border-muted-foreground bg-muted"
            )}
            onClick={clearTags}
          >
            {t("SYSCOMMON.all", { defaultValue: "All" })}
          </ToggleGroupItem>

          {tags?.map((tag) => {
            const tagColor = tag.attributes?.color;
            const tagName = tag.attributes?.name;
            const isSelected = selectedTagIds.includes(tag.id);

            return (
              <ToggleGroupItem
                key={tag.id}
                value={tag.id}
                className="text-sm font-medium rounded-lg px-6 py-0 border-2 cursor-pointer"
                style={{
                  backgroundColor: isSelected
                    ? applyAlpha(tagColor, 0.2)
                    : undefined,
                  color: isSelected ? tagColor : undefined,
                  borderColor: isSelected ? tagColor : "#e5e7eb",
                }}
              >
                {tagName}
              </ToggleGroupItem>
            );
          })}
        </ToggleGroup>
      </section>

      <section className="space-y-6">
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
