export type WorkspaceItem = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

export type WorkspaceCreateParams = {
  name: string;
  description: string;
};
