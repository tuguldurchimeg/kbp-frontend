import { CategoryItem, DocumentItem } from "./document";

export type WorkspaceItem = {
  id: string;
  type: "workspace";
  attributes: {
    name: string;
    description: string;
    imageUrl?: string;
    categories?: { data: CategoryItem[] };
    documents?: { data: DocumentItem[] };
  };
};

export type WorkspaceCreateParams = {
  name: string;
  description?: string;
};

export type WorkspaceUpdateParams = {
  id: string;
  params: WorkspaceCreateParams;
};
