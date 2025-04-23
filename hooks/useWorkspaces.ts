"use client";

import { useEffect, useState } from "react";
import { getWorkspaces, createWorkspace } from "@/app/api/workspaces/route";
import { WorkspaceItem, WorkspaceCreateParams } from "@/types/workspace";

export default function useWorkspace() {
  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchWorkspaces = async () => {
    setLoading(true);
    try {
      const data = await getWorkspaces();
      setWorkspaces(data);
    } catch (err) {
      console.error("Failed to fetch workspaces", err);
    } finally {
      setLoading(false);
    }
  };

  const addWorkspace = async (params: WorkspaceCreateParams) => {
    try {
      const created = await createWorkspace(params);
      setWorkspaces((prev) => [...prev, created]);
      return created;
    } catch (err) {
      console.error("Failed to create workspace", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return {
    workspaces,
    loading,
    fetchWorkspaces,
    addWorkspace,
  };
}
