import { CategoryItem } from "@/types/workspace";

export const KB_CATEGORIES: CategoryItem[] = [
  {
    id: "1",
    name: "Getting Started",
    documents: [
      { id: "1", name: "Welcome to the Platform" },
      { id: "2", name: "User Roles Overview" },
    ],
    subcategories: [
      {
        id: "3",
        name: "Account Setup",
        parentId: "1",
        documents: [
          { id: "3", name: "Sign Up" },
          { id: "4", name: "Verify Email" },
        ],
        subcategories: [
          {
            id: "4",
            name: "Advanced Setup",
            parentId: "3",
            documents: [
              { id: "5", name: "Connect External Services" },
              { id: "6", name: "Two-Factor Authentication" },
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
          { id: "7", name: "Markdown Support" },
          { id: "8", name: "Embedding Media" },
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
            documents: [{ id: "9", name: "Managing Tags" }],
          },
        ],
      },
    ],
  },
];
