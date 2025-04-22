import { JSONContent } from "@tiptap/core";

export type DocumentItem = {
  id: string;
  title: string;
  content: JSONContent;
};

export type CategoryItem = {
  id: string;
  name: string;
  documents: DocumentItem[];
  subcategories?: CategoryItem[];
  parentId?: string | null;
};

export type DocumentCreateParams = {
  title: string;
  content: JSONContent;
  category_id: string;
};
