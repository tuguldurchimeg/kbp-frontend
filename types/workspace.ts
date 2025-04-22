export type WorkspaceItem = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

export type WorkspaceCreateParams = {
  title: string;
  company_id: string;
};
