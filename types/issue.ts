import { DocumentItem } from "./document";
import { UserItem } from "./user";

export type IssueItem = {
  id: string;
  type: "issue";
  attributes: {
    title: string;
    description: string;
    status: string; // "open", "in progress", "closed"
    priority: string; // "low", "medium", "high"
    issue_type: string; // "problem", "question"
    created_by: { data: UserItem };
    assignees: { data: UserItem[] };
    documents_count: number;
    documents?: { data: DocumentItem[] };
    created_at: string;
    updated_at: string;
    workspace_id: string;
  };
};

export type IssueCommentItem = {
  id: string;
  type: "issue_comment";
  attributes: {
    comment: string;
    issue: { data: IssueItem };
    user: { data: UserItem };
    replies: { data: IssueCommentItem[] };
    created_at: string;
    updated_at: string;
  };
};

export type IssueCreateParams = {
  title: string;
  description: string;
  status: string; // "open", "in progress", "closed"
  priority: string; // "low", "medium", "high"
  issue_type: string; // "problem", "question"
  workspace_id: string;
  assignee_ids?: string[];
};

export type IssueUpdateParams = {
  id: string;
  params: IssueCreateParams;
};

export type IssueCommentListParams = {
  issue_id: string;
};

export type IssueCommentCreateParams = {
  comment: string;
  user_id: string;
  issue_id: string;
  parent_id?: string;
};

export type IssueCommentUpdateParams = {
  id: string;
  params: IssueCommentCreateParams;
};

export type ReportParams = { workspace_id: string };

export type ReportResponse = {
  by_status: { status: string; count: number }[];
  by_priority: { priority: string; count: number }[];
  by_type: { type: string; count: number }[];
  by_issue_assignee: { user: { data: UserItem }; count: number }[];
};
