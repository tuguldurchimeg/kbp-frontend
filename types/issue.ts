import { DocumentItem } from "./document";
import { UserItem } from "./user";

export type IssueItem = {
  id: string;
  type: "issue";
  attributes: {
    title: string;
    description: string;
    status: string; // e.g., "open", "in progress", "closed"
    priority: string; // e.g., "low", "medium", "high"
    created_by: { data: UserItem };
    assignees: { data: UserItem[] };
    documents_count: number;
    documents?: { data: DocumentItem[] }; // only on detail
    created_at: string;
    updated_at: string;
  };
};
