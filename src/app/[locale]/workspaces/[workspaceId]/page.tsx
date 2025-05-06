"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FolderOpen } from "lucide-react";
import DocumentCard from "@/components/@documents/document-card";
import { getWorkspace } from "@/src/app/lib/actions/workspace.actions";
import { WorkspaceItem } from "@/types/workspace";
import WorkspaceSummary from "@/components/@workspace/SummaryChart";

export default function WorkspaceDetailPage() {
  const params = useParams();
  const id = params.workspaceId;
  const [workspace, setWorkspace] = useState<WorkspaceItem | null>(null);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const fetchWorkspace = async () => {
      try {
        const data = await getWorkspace(id);
        setWorkspace(data);
      } catch (error) {
        console.error("Failed to load workspace", error);
      }
    };

    fetchWorkspace();
  }, [id]);

  if (!workspace) {
    return <p className="p-6">Ачааллаж байна...</p>;
  }

  return (
    <main className="flex flex-col gap-10 px-4 w-full mx-10">
      {/* <section className="w-full flex justify-between items-center max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FolderOpen className="w-5 h-5" />
          {t("documents")}
        </h2>

        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="w-4 h-4 mr-1" />
          {t("newDocument")}
        </Button>
      </section> */}
      <WorkspaceSummary
        categories={workspace.attributes.categories?.data || []}
      />

      {/* Full-width section for categories */}
      <section className="w-full space-y-12 max-w-6xl mx-auto">
        {workspace.attributes.categories?.data.map((category) => (
          <div key={category.id} className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
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
