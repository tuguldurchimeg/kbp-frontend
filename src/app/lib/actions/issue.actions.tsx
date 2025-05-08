import api from "../../../../utils/api";
import { URI } from "@/constants/uri.constants";
import {
  IssueCreateParams,
  IssueItem,
  ReportParams,
  ReportResponse,
} from "@/types/issue";

export async function getIssues(): Promise<IssueItem[]> {
  const res = await api.get(URI.ISSUES);
  return res.data;
}

export async function getIssue(id: string): Promise<IssueItem> {
  const res = await api.get(`${URI.ISSUES}/${id}`);
  return res.data.data;
}

export async function getIssueChartDatas(
  params: ReportParams
): Promise<ReportResponse> {
  const res = await api.get(`${URI.ISSUES}/report`, { params: params });
  return res.data;
}

export const createIssue = async (
  params: IssueCreateParams
): Promise<IssueItem> => {
  const res = await api.post(URI.ISSUES, params);
  return res.data;
};

export const updateIssue = async (
  id: string,
  params: Partial<IssueCreateParams>
): Promise<IssueItem> => {
  const res = await api.put(`${URI.ISSUES}/${id}`, params);
  return res.data;
};

export async function deleteIssue(id: string): Promise<void> {
  await api.delete(`${URI.ISSUES}/${id}`);
}

export const getQuickAccessIssues = async (): Promise<IssueItem[]> => {
  const res = await api.get(`${URI.ISSUES}/quick_access`);
  return res.data?.data;
};
