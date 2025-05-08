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

export type IssueCreateParams = {
  title: string;
  description: string;
  status: string; // "open", "in progress", "closed"
  priority: string; // "low", "medium", "high"
  issue_type: string; // "problem", "question"
  workspace_id: string;
};

export type ReportParams = { workspace_id: string };

export type ReportResponse = {
  by_status: { status: string; count: number }[];
  by_priority: { priority: string; count: number }[];
  by_type: { type: string; count: number }[];
  by_assignee: { user: UserItem; count: number }[];
};
