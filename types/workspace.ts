import { CategoryItem, DocumentItem, FileItem, TagItem } from "./document";
import { IssueItem } from "./issue";
import { UserItem } from "./user";

export type WorkspaceItem = {
  id: string;
  type: "workspace";
  attributes: {
    name: string;
    description: string;
    image_url?: string;
    categories?: { data: CategoryItem[] };
    documents?: { data: DocumentItem[] };
    issues?: { data: IssueItem[] };
    tags?: { data: TagItem[] };
  };
};

export type WorkspaceCreateParams = {
  name: string;
  description?: string;
  image_url?: string;
};

export type WorkspaceFilterParams = {
  tag_ids?: string[];
  keyword?: string;
};

export type WorkspaceUpdateParams = {
  id: string;
  params: WorkspaceCreateParams;
};

export type WorkspaceRoleItem = {
  id: string;
  type: "workspace_role_detail";
  attributes: {
    action: string;
    user: { data: UserItem };
    workspace: { data: WorkspaceItem };
  };
};

export type WorkspaceRoleUpdateParams = {
  id: string;
  params: { action: string };
};

export type WorkspaceSearchParams = {
  workspace_id?: string;
  keyword: string;
};

export type WorkspaceSearchResponse = {
  documents: { data: DocumentItem[] };
  categories: { data: CategoryItem[] };
  files: { data: FileItem[] };
};
