import api from "@/services/api";
import { URI } from "@/constants/uri.constants";

export type Workspace = {
  id: number;
  name: string;
  company_id: string;
};

export type WorkspaceCreate = {
  title: string;
  company_id: string;
};

export const getWorkspaces = async (): Promise<Workspace[]> => {
  const res = await api.get(URI.WORKSPACES);
  return res.data;
};

export const createWorkspace = async (data: {
  title: string;
  description: string;
}): Promise<Workspace> => {
  const res = await api.post(URI.WORKSPACES, data);
  return res.data;
};
