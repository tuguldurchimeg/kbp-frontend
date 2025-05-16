import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WorkspaceItem } from "@/types/workspace";

interface WorkspaceState {
  role: string | null;
  workspace_id: string | null;
  workspace: WorkspaceItem | null;
  setRole: (role: string, workspace_id: string) => void;
  setWorkspace: (workspace: WorkspaceItem) => void;
  clear: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      role: null,
      workspace_id: null,
      workspace: null,
      setRole: (role, workspace_id) => set({ role, workspace_id }),
      setWorkspace: (workspace) =>
        set({ workspace, workspace_id: workspace.id }),
      clear: () => set({ role: null, workspace_id: null, workspace: null }),
    }),
    {
      name: "workspace-store", // LocalStorage key
      partialize: (state) => ({
        role: state.role,
        workspace_id: state.workspace_id,
        workspace: state.workspace,
      }),
    }
  )
);
