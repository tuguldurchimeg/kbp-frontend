"use client";

import { useEffect, useState } from "react";
import { WorkspaceItem } from "@/types/workspace";
import { getWorkspaces } from "@/app/lib/actions/workspace.actions";
import WorkspaceCard from "@/components/@workspace/WorkspaceCard";

const WorkspaceCardList = () => {
  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  if (loading) {
    return <div>Loading workspaces...</div>;
  }

  if (workspaces.length === 0) {
    return <div>No workspaces available.</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {workspaces.map((workspace) => (
          <WorkspaceCard key={workspace.id} item={workspace} />
        ))}
      </div>
    </div>
  );
};

export default WorkspaceCardList;
