import { JSONContent } from "@tiptap/core";
import { UserItem } from "./user";

export type DocumentItem = {
  id: string;
  title: string;
  content?: JSONContent;
  tags?: TagItem[];
  created_at?: string;
  updated_at?: string;
  user?: UserItem;
  category?: { data: CategoryItem };
};

export type CategoryItem = {
  id: string;
  name: string;
  documents?: DocumentItem[];
  subcategories?: CategoryItem[];
  parentId?: string | null;
};

export type DocumentCreateParams = {
  title: string;
  content: JSONContent;
  category_id: string;
};

export type TagItem = {
  id: string;
  name: string;
  description: string;
  color: string;
};

export type TagCreateParams = {
  name: string;
  description?: string;
  color?: string;
};
