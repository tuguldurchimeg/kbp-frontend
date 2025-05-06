import { CategoryItem } from "./document";

export type WorkspaceItem = {
  id: string;
  type: "workspace";
  attributes: {
    name: string;
    description: string;
    imageUrl?: string;
    categories?: { data: CategoryItem[] };
  };
};

export type WorkspaceCreateParams = {
  name: string;
  description: string;
};
