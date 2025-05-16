import api from "@/utils/api";
import { URI } from "@/constants/uri.constants";
import {
  UserRoleParams,
  WorkspaceCreateParams,
  WorkspaceFilterParams,
  WorkspaceItem,
  WorkspaceRoleItem,
  WorkspaceRoleUpdateParams,
  WorkspaceSearchParams,
  WorkspaceSearchResponse,
  WorkspaceUpdateParams,
} from "@/types/workspace";
import { ListParams } from "@/types/document";

export const getWorkspaces = async (): Promise<WorkspaceItem[]> => {
  const res = await api.get(URI.WORKSPACES);
  return res.data.data;
};

export const createWorkspace = async (
  params: WorkspaceCreateParams
): Promise<WorkspaceItem> => {
  const res = await api.post(URI.WORKSPACES, params);
  return res.data.data;
};

export const updateWorkspace = async (
  arg: WorkspaceUpdateParams
): Promise<WorkspaceItem> => {
  const res = await api.put(`${URI.WORKSPACES}/${arg.id}`, arg.params);
  return res.data.data;
};

export const deleteWorkspace = async (id: string): Promise<void> => {
  await api.delete(`${URI.WORKSPACES}/${id}`);
};

export const getWorkspace = async (
  id: string,
  params?: WorkspaceFilterParams
): Promise<WorkspaceItem> => {
  const res = await api.get(`${URI.WORKSPACES}/${id}`, { params });
  return res.data.data;
};

export const getWorkspaceUsers = async (
  params: ListParams
): Promise<WorkspaceRoleItem[]> => {
  const res = await api.get(URI.WORKSPACE_ROLE, { params });
  return res.data.data;
};

export const getUserRole = async (
  arg: UserRoleParams
): Promise<WorkspaceRoleItem> => {
  const res = await api.get(`${URI.WORKSPACES}/${arg.id}/user_role`, {
    params: arg.params,
  });
  return res.data.data;
};

export const updateWorkspaceRole = async (
  arg: WorkspaceRoleUpdateParams
): Promise<WorkspaceRoleItem> => {
  const res = await api.put(`${URI.WORKSPACE_ROLE}/${arg.id}`, arg.params);
  return res.data.data;
};

export const searchWorkspace = async (
  params: WorkspaceSearchParams
): Promise<WorkspaceSearchResponse> => {
  const res = await api.get(`${URI.WORKSPACES}/search`, { params });
  return res.data;
};
