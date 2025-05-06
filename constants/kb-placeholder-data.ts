import {
  CategoryItem,
  DocumentItem,
  GlossaryItem,
  SeoItem,
  TagItem,
} from "@/types/document";
import { IssueItem } from "@/types/issue";
import { UserItem } from "@/types/user";

export const KB_CATEGORIES: CategoryItem[] = [
  {
    id: "1",
    type: "category",
    attributes: {
      name: "Getting Started",
      documents: {
        data: [
          {
            id: "1",
            type: "document",
            attributes: {
              title: "Welcome to the Platform",
            },
          },
          {
            id: "2",
            type: "document",
            attributes: {
              title: "User Roles Overview",
            },
          },
        ],
      },
      subcategories: {
        data: [
          {
            id: "3",
            type: "category",
            attributes: {
              name: "Account Setup",
              parentId: "1",
              documents: {
                data: [
                  {
                    id: "3",
                    type: "document",
                    attributes: {
                      title: "Sign Up",
                      created_at: "2025-01-15T12:00:00Z",
                      updated_at: "2025-02-25T10:00:00Z",
                    },
                  },
                  {
                    id: "4",
                    type: "document",
                    attributes: {
                      title: "Verify Email",
                      created_at: "2025-01-18T09:30:00Z",
                      updated_at: "2025-03-01T14:15:00Z",
                    },
                  },
                ],
              },
              subcategories: {
                data: [
                  {
                    id: "4",
                    type: "category",
                    attributes: {
                      name: "Advanced Setup",
                      parentId: "3",
                      documents: {
                        data: [
                          {
                            id: "5",
                            type: "document",
                            attributes: {
                              title: "Connect External Services",
                              created_at: "2025-01-22T15:45:00Z",
                              updated_at: "2025-03-05T16:00:00Z",
                            },
                          },
                          {
                            id: "6",
                            type: "document",
                            attributes: {
                              title: "Two-Factor Authentication",
                              created_at: "2025-01-25T08:00:00Z",
                              updated_at: "2025-03-10T17:30:00Z",
                            },
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
  {
    id: "2",
    type: "category",
    attributes: {
      name: "Knowledge Base Management",
      documents: { data: [] },
      subcategories: {
        data: [
          {
            id: "5",
            type: "category",
            attributes: {
              name: "Writing Articles",
              parentId: "2",
              documents: {
                data: [
                  {
                    id: "7",
                    type: "document",
                    attributes: {
                      title: "Markdown Support",
                      created_at: "2025-02-01T09:00:00Z",
                      updated_at: "2025-03-12T11:45:00Z",
                    },
                  },
                  {
                    id: "8",
                    type: "document",
                    attributes: {
                      title: "Embedding Media",
                      created_at: "2025-02-05T13:20:00Z",
                      updated_at: "2025-03-15T14:30:00Z",
                    },
                  },
                ],
              },
            },
          },
          {
            id: "6",
            type: "category",
            attributes: {
              name: "Organizing Content",
              parentId: "2",
              documents: { data: [] },
              subcategories: {
                data: [
                  {
                    id: "7",
                    type: "category",
                    attributes: {
                      name: "Tags and Labels",
                      parentId: "6",
                      documents: {
                        data: [
                          {
                            id: "9",
                            type: "document",
                            attributes: {
                              title: "Managing Tags",
                              created_at: "2025-02-10T10:10:00Z",
                              updated_at: "2025-03-18T12:00:00Z",
                            },
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
];

export const CURRENT_USER: UserItem = {
  id: "1",
  type: "user",
  attributes: {
    uid: "user123",
    firstname: "Tuguldurchimeg",
    lastname: "R",
    email: "tgldrchmg@gmail.com",
    avatar: "/avatar.jpg",
  },
};

export const TAG_PLACEHOLDERS: TagItem[] = [
  {
    id: "1",
    type: "tag",
    attributes: {
      name: "Intro",
      description: "Introductory content",
      color: "#C62828", // Red
      documents: { data: [] },
      created_at: "2025-03-18T12:00:00Z",
    },
  },
  {
    id: "2",
    type: "tag",
    attributes: {
      name: "Tip",
      description: "Helpful tip",
      color: "#2E7D32", // Green
      documents: {
        data: [
          {
            id: "7",
            type: "document",
            attributes: {
              title: "Markdown Support",
              created_at: "2025-02-01T09:00:00Z",
              updated_at: "2025-03-12T11:45:00Z",
            },
          },
        ],
      },
      created_at: "2025-03-18T12:00:00Z",
    },
  },
  {
    id: "3",
    type: "tag",
    attributes: {
      name: "Warning",
      description: "Use with caution",
      color: "#F9A825", // Amber
      documents: {
        data: [
          {
            id: "8",
            type: "document",
            attributes: {
              title: "Embedding Media",
              created_at: "2025-02-05T13:20:00Z",
              updated_at: "2025-03-15T14:30:00Z",
            },
          },
        ],
      },
      created_at: "2025-03-18T12:00:00Z",
    },
  },
  {
    id: "4",
    type: "tag",
    attributes: {
      name: "Idea",
      description: "Creative thought",
      color: "#1565C0", // Blue
      documents: {
        data: [
          {
            id: "7",
            type: "document",
            attributes: {
              title: "Markdown Support",
              created_at: "2025-02-01T09:00:00Z",
              updated_at: "2025-03-12T11:45:00Z",
            },
          },
          {
            id: "8",
            type: "document",
            attributes: {
              title: "Embedding Media",
              created_at: "2025-02-05T13:20:00Z",
              updated_at: "2025-03-15T14:30:00Z",
            },
          },
        ],
      },
      created_at: "2025-03-18T12:00:00Z",
    },
  },
  {
    id: "5",
    type: "tag",
    attributes: {
      name: "Reference",
      description: "For further reading",
      color: "#6A1B9A", // Purple
      documents: { data: [] },
      created_at: "2025-03-18T12:00:00Z",
    },
  },
];

export const DOC_TEMPLATES: DocumentItem[] = [
  {
    id: "1",
    type: "document",
    attributes: {
      title: "How to Guides",
      updated_at: "2025-03-18T12:00:00Z",
      user: { data: CURRENT_USER },
      is_template: true,
    },
  },
  {
    id: "2",
    type: "document",
    attributes: {
      title: "Getting Started Guides",
      updated_at: "2025-03-18T12:00:00Z",
      user: { data: CURRENT_USER },
      is_template: true,
    },
  },
];

export const ISSUEDATA: IssueItem[] = [
  {
    id: "1",
    type: "issue",
    attributes: {
      title: "Cover page",
      description: "",
      status: "in_progress",
      priority: "medium",
      created_by: {
        data: {
          id: "1",
          type: "user",
          attributes: {
            uid: "user-1",
            email: "system@example.com",
            firstname: "System",
            lastname: "Bot",
            avatar: "https://example.com/avatar.png",
          },
        },
      },
      assignees: {
        data: [],
      },
      documents_count: 0,
      documents: {
        data: [],
      },
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: "2",
    type: "issue",
    attributes: {
      title: "Table of contents",
      description: "",
      status: "open",
      priority: "medium",
      created_by: {
        data: {
          id: "1",
          type: "user",
          attributes: {
            uid: "user-1",
            email: "system@example.com",
            firstname: "System",
            lastname: "Bot",
            avatar: "https://example.com/avatar.png",
          },
        },
      },
      assignees: {
        data: [],
      },
      documents_count: 0,
      documents: {
        data: [],
      },
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: "3",
    type: "issue",
    attributes: {
      title: "Improve search functionality",
      description:
        "Users report inconsistent results when searching with filters.",
      status: "closed",
      priority: "high",
      created_by: {
        data: {
          id: "1",
          type: "user",
          attributes: {
            uid: "admin-1",
            email: "admin@example.com",
            firstname: "Alice",
            lastname: "Wong",
            avatar: "https://example.com/avatar/alice.png",
          },
        },
      },
      assignees: {
        data: [
          {
            id: "2",
            type: "user",
            attributes: {
              uid: "dev-2",
              email: "dev.john@example.com",
              firstname: "John",
              lastname: "Doe",
              avatar: "https://example.com/avatar/john.png",
            },
          },
          {
            id: "3",
            type: "user",
            attributes: {
              uid: "dev-3",
              email: "dev.jane@example.com",
              firstname: "Jane",
              lastname: "Smith",
              avatar: "https://example.com/avatar/jane.png",
            },
          },
        ],
      },
      documents_count: 1,
      documents: {
        data: [
          {
            id: "doc-42",
            type: "document",
            attributes: {
              title: "Search feature requirements",
              created_at: "2024-04-01T10:00:00Z",
              updated_at: "2024-04-15T12:00:00Z",
              user: {
                data: {
                  id: "2",
                  type: "user",
                  attributes: {
                    uid: "dev-2",
                    email: "dev.john@example.com",
                    firstname: "John",
                    lastname: "Doe",
                    avatar: "https://example.com/avatar/john.png",
                  },
                },
              },
              is_template: false,
            },
          },
        ],
      },
      created_at: "2024-03-15T09:00:00Z",
      updated_at: "2024-04-18T14:00:00Z",
    },
  },
];

export const GLOSSARY_PLACEHOLDERS: GlossaryItem[] = [
  {
    id: "1",
    type: "glossary",
    attributes: {
      name: "API",
      content:
        "An API (Application Programming Interface) allows different software applications to communicate with each other.",
      created_at: "2024-11-01T10:00:00Z",
    },
  },
  {
    id: "2",
    type: "glossary",
    attributes: {
      name: "Frontend",
      content:
        "The frontend is the part of a website or application that users interact with directly.",
      created_at: "2024-11-05T14:30:00Z",
    },
  },
  {
    id: "3",
    type: "glossary",
    attributes: {
      name: "Backend",
      content:
        "The backend is the server-side of an application responsible for business logic and database interactions.",
      created_at: "2024-11-10T08:45:00Z",
    },
  },
];

const MOCK_DOCUMENT: DocumentItem = {
  id: "doc-1",
  type: "document",
  attributes: {
    title: "How APIs Work",
  },
};

export const SEO_PLACEHOLDERS: SeoItem[] = [
  {
    id: "seo-1",
    type: "seo",
    attributes: {
      title: "Understanding APIs",
      content: "Learn how APIs connect systems and enable data exchange.",
      created_at: "2024-12-01T12:00:00Z",
      document: { data: MOCK_DOCUMENT },
    },
  },
  {
    id: "seo-2",
    type: "seo",
    attributes: {
      title: "Frontend vs Backend",
      content:
        "Explore the differences and responsibilities of frontend and backend development.",
      created_at: "2024-12-02T09:15:00Z",
      document: { data: MOCK_DOCUMENT },
    },
  },
];

export const topics = [
  {
    title: "Getting started",
    author: "Tuguldurchimeg Renchinchime",
    views: 234,
  },
  {
    title: "Overview",
    author: "Tuguldurchimeg Renchinchime",
    views: 198,
  },
  {
    title: "Template - Troubleshooting article",
    author: "KKK test",
    views: 142,
  },
  {
    title: "Template - How-to guide",
    author: "KKK test",
    views: 95,
  },
  {
    title: "KKK test",
    author: "KKK test",
    views: 77,
  },
  {
    title: "2025-03-18 Meeting notes",
    author: "Tuguldurchimeg Renchinchime",
    views: 120,
  },
];
