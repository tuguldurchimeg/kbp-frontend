import { CategoryItem, TagItem } from "@/types/document";
import { UserItem } from "@/types/user";

export const KB_CATEGORIES: CategoryItem[] = [
  {
    id: "1",
    name: "Getting Started",
    documents: [
      {
        id: "1",
        title: "Welcome to the Platform",
      },
      {
        id: "2",
        title: "User Roles Overview",
      },
    ],
    subcategories: [
      {
        id: "3",
        name: "Account Setup",
        parentId: "1",
        documents: [
          {
            id: "3",
            title: "Sign Up",
            content: {},
            tags: [],
            created_at: "2025-01-15T12:00:00Z",
            updated_at: "2025-02-25T10:00:00Z",
          },
          {
            id: "4",
            title: "Verify Email",
            content: {},
            tags: [],
            created_at: "2025-01-18T09:30:00Z",
            updated_at: "2025-03-01T14:15:00Z",
          },
        ],
        subcategories: [
          {
            id: "4",
            name: "Advanced Setup",
            parentId: "3",
            documents: [
              {
                id: "5",
                title: "Connect External Services",
                content: {},
                tags: [],
                created_at: "2025-01-22T15:45:00Z",
                updated_at: "2025-03-05T16:00:00Z",
              },
              {
                id: "6",
                title: "Two-Factor Authentication",
                content: {},
                tags: [],
                created_at: "2025-01-25T08:00:00Z",
                updated_at: "2025-03-10T17:30:00Z",
              },
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
          {
            id: "7",
            title: "Markdown Support",
            content: {},
            tags: [],
            created_at: "2025-02-01T09:00:00Z",
            updated_at: "2025-03-12T11:45:00Z",
          },
          {
            id: "8",
            title: "Embedding Media",
            content: {},
            tags: [],
            created_at: "2025-02-05T13:20:00Z",
            updated_at: "2025-03-15T14:30:00Z",
          },
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
            documents: [
              {
                id: "9",
                title: "Managing Tags",
                content: {},
                tags: [],
                created_at: "2025-02-10T10:10:00Z",
                updated_at: "2025-03-18T12:00:00Z",
              },
            ],
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

export const TAG_PLACEHOLDERS: TagItem[] = [
  {
    id: "1",
    name: "Intro",
    description: "Introductory content",
    color: "#C62828", // Red
  },
  {
    id: "2",
    name: "Tip",
    description: "Helpful tip",
    color: "#2E7D32", // Green
  },
  {
    id: "3",
    name: "Warning",
    description: "Use with caution",
    color: "#F9A825", // Amber
  },
  {
    id: "4",
    name: "Idea",
    description: "Creative thought",
    color: "#1565C0", // Blue
  },
  {
    id: "5",
    name: "Reference",
    description: "For further reading",
    color: "#6A1B9A", // Purple
  },
];
