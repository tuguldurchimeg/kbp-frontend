import api from "../../../../utils/api";
import { URI } from "@/constants/uri.constants";
import { ListParams } from "@/types/document";
import {
  IssueCommentCreateParams,
  IssueCommentItem,
  IssueCommentListParams,
  IssueCommentUpdateParams,
  IssueCreateParams,
  IssueItem,
  IssueUpdateParams,
  ReportParams,
  ReportResponse,
} from "@/types/issue";

export async function getIssues(params: ListParams): Promise<IssueItem[]> {
  const res = await api.get(URI.ISSUES, { params });
  return res.data.data;
}

export async function getIssue(id: string): Promise<IssueItem> {
  const res = await api.get(`${URI.ISSUES}/${id}`);
  return res.data.data;
}

export async function getIssueChartDatas(
  params: ReportParams
): Promise<ReportResponse> {
  const res = await api.get(`${URI.ISSUES}/report`, { params });
  return res.data;
}

export const createIssue = async (
  params: IssueCreateParams
): Promise<IssueItem> => {
  const res = await api.post(URI.ISSUES, params);
  return res.data.data;
};

export const updateIssue = async (
  arg: IssueUpdateParams
): Promise<IssueItem> => {
  const res = await api.put(`${URI.ISSUES}/${arg.id}`, arg.params);
  return res.data.data;
};

export async function deleteIssue(id: string): Promise<void> {
  await api.delete(`${URI.ISSUES}/${id}`);
}

export async function getIssueComments(
  params: IssueCommentListParams
): Promise<IssueCommentItem[]> {
  const res = await api.get(URI.ISSUE_COMMENTS, { params });
  return res.data.data;
}

export const createIssueComment = async (
  params: IssueCommentCreateParams
): Promise<IssueCommentItem> => {
  const res = await api.post(URI.ISSUE_COMMENTS, params);
  return res.data.data;
};

export const updateIssueComment = async (
  arg: IssueCommentUpdateParams
): Promise<IssueCommentItem> => {
  const res = await api.put(`${URI.ISSUE_COMMENTS}/${arg.id}`, arg.params);
  return res.data.data;
};

export async function deleteIssueComment(id: string): Promise<void> {
  await api.delete(`${URI.ISSUE_COMMENTS}/${id}`);
}
