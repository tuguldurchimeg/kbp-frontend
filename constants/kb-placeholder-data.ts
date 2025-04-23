import { CategoryItem } from "@/types/document";
import { UserItem } from "@/types/user";

export const KB_CATEGORIES: CategoryItem[] = [
  {
    id: "1",
    name: "Getting Started",
    documents: [
      { id: "1", title: "Welcome to the Platform", content: {} },
      { id: "2", title: "User Roles Overview", content: {} },
    ],
    subcategories: [
      {
        id: "3",
        name: "Account Setup",
        parentId: "1",
        documents: [
          { id: "3", title: "Sign Up", content: {} },
          { id: "4", title: "Verify Email", content: {} },
        ],
        subcategories: [
          {
            id: "4",
            name: "Advanced Setup",
            parentId: "3",
            documents: [
              { id: "5", title: "Connect External Services", content: {} },
              { id: "6", title: "Two-Factor Authentication", content: {} },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Knowledge Base Management",
    documents: [],
    subcategories: [
      {
        id: "5",
        name: "Writing Articles",
        parentId: "2",
        documents: [
          { id: "7", title: "Markdown Support", content: {} },
          { id: "8", title: "Embedding Media", content: {} },
        ],
      },
      {
        id: "6",
        name: "Organizing Content",
        parentId: "2",
        documents: [],
        subcategories: [
          {
            id: "7",
            name: "Tags and Labels",
            parentId: "6",
            documents: [{ id: "9", title: "Managing Tags", content: {} }],
          },
        ],
      },
    ],
  },
];

export const CURRENT_USER: UserItem = {
  id: "1",
  uid: "user123",
  firstname: "Tuguldurchimeg",
  lastname: "R",
  email: "tgldrchmg@gmail.com",
  avatar: "/avatar.jpg",
};
