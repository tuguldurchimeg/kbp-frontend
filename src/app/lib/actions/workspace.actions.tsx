import api from "@/utils/api";
import { URI } from "@/constants/uri.constants";
import { WorkspaceCreateParams, WorkspaceItem } from "@/types/workspace";

export const getWorkspaces = async (): Promise<WorkspaceItem[]> => {
  const res = await api.get(URI.WORKSPACES);
  return res.data;
};

export const createWorkspace = async (
  params: WorkspaceCreateParams
): Promise<WorkspaceItem> => {
  const res = await api.post(URI.WORKSPACES, params);
  return res.data;
};

export const updateWorkspace = async (
  id: string,
  params: Partial<WorkspaceCreateParams>
): Promise<WorkspaceItem> => {
  const res = await api.put(`${URI.WORKSPACES}/${id}`, params);
  return res.data;
};

export const deleteWorkspace = async (id: string): Promise<void> => {
  await api.delete(`${URI.WORKSPACES}/${id}`);
};
