import { JSONContent } from "@tiptap/core";
import { UserItem } from "./user";

export type DocumentItem = {
  id: string;
  type: "document";
  attributes: {
    title: string;
    content?: JSONContent;
    tags?: { data: TagItem[] };
    created_at?: string;
    updated_at?: string;
    user?: { data: UserItem };
    category?: { data: CategoryItem };
    is_template?: boolean;
    view_count?: number;
    workspace_id: string;
  };
};

export type CategoryItem = {
  id: string;
  type: "category";
  attributes: {
    name: string;
    documents?: { data: DocumentItem[] };
    subcategories?: { data: CategoryItem[] };
    parentId?: string | null;
  };
};

export type FileItem = {
  id: string;
  type: "file";
  attributes: {
    name: string;
    documents?: { data: DocumentItem[] };
    size: string;
    file_type: string;
    url: string;
    uploader?: { data: UserItem };
  };
};

export type CategoryCreateParams = {
  name: string;
  parent_id?: string;
  workspace_id: string;
};

export type DocumentCreateParams = {
  title: string;
  content?: JSONContent;
  category_id?: string;
  workspace_id: string;
  is_template?: boolean;
};

export type DocumentUpdateParams = {
  id: string;
  params: DocumentCreateParams;
};

export type DocumentTagSetParams = {
  document_id: string;
  tag_id: string;
};

export type TagItem = {
  id: string;
  type: "tag";
  attributes: {
    name: string;
    description: string;
    color: string;
    documents?: { data: DocumentItem[] };
    created_at?: string;
    workspace_id?: string;
  };
};

export type TagCreateParams = {
  name: string;
  description?: string;
  color?: string;
  workspace_id: string;
};

export type TagUpdateParams = {
  id: string;
  params: TagCreateParams;
};

export type GlossaryItem = {
  id: string;
  type: "glossary";
  attributes: {
    name: string;
    content: string;
    workspace_id: string;
    created_at: string;
    updated_at: string;
  };
};

export type GlossaryCreateParams = {
  name: string;
  content: string;
  workspace_id: string;
};

export type GlossaryUpdateParams = {
  id: string;
  params: GlossaryCreateParams;
};

export type SeoItem = {
  id: string;
  type: "seo";
  attributes: {
    title: string;
    content: string;
    document: { data: DocumentItem };
    created_at: string;
  };
};

export type SeoCreateParams = {
  title: string;
  content: string;
  document_id: string;
};

export type SeoUpdateParams = {
  id: string;
  params: SeoCreateParams;
};

export type AccessItem = {
  id: string;
  type: "access";
  attributes: {
    role: string;
    user: { data: UserItem };
  };
};

export type AccessCreateParams = {
  user_id: string;
  role: string;
};

export type AccessUpdateParams = {
  id: string;
  params: AccessCreateParams;
};

export type ListParams = {
  workspace_id: string;
};

// file
export interface PresignedUrlRequest {
  file_name: string;
  mime_type: string;
  content_type: "documents" | "avatar" | "file" | "workspace";
  document_id?: string;
  workspace_id?: string;
}

export interface PresignedUrlResponse {
  url: string;
  file_url: string;
  key: string;
  file_name: string;
}
