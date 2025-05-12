import { CategoryItem, DocumentItem } from "./document";

export type WorkspaceItem = {
  id: string;
  type: "workspace";
  attributes: {
    name: string;
    description: string;
    image_url?: string;
    categories?: { data: CategoryItem[] };
    documents?: { data: DocumentItem[] };
  };
};

export type WorkspaceCreateParams = {
  name: string;
  description?: string;
  image_url?: string;
};

export type WorkspaceUpdateParams = {
  id: string;
  params: WorkspaceCreateParams;
};
