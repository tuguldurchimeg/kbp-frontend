export interface WorkspaceItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export type DocumentItem = {
  id: string;
  name: string;
};

export type CategoryItem = {
  id: string;
  name: string;
  documents: DocumentItem[];
  subcategories?: CategoryItem[];
  parentId?: string | null;
};
