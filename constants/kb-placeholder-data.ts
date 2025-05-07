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
              workspace_id: "1",
              title: "Welcome to the Platform",
            },
          },
          {
            id: "2",
            type: "document",
            attributes: {
              workspace_id: "1",
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
                      workspace_id: "1",
                      updated_at: "2025-02-25T10:00:00Z",
                    },
                  },
                  {
                    id: "4",
                    type: "document",
                    attributes: {
                      title: "Verify Email",
                      created_at: "2025-01-18T09:30:00Z",
                      workspace_id: "1",
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
                              workspace_id: "1",
                              updated_at: "2025-03-05T16:00:00Z",
                            },
                          },
                          {
                            id: "6",
                            type: "document",
                            attributes: {
                              title: "Two-Factor Authentication",
                              created_at: "2025-01-25T08:00:00Z",
                              workspace_id: "1",
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
                      workspace_id: "1",
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
                      workspace_id: "1",
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
                              workspace_id: "1",
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
      name: "Танилцуулга",
      description: "Танилцуулгын агуулга",
      color: "#C62828",
      documents: { data: [] },
      created_at: "2025-03-18T12:00:00Z",
    },
  },
  {
    id: "2",
    type: "tag",
    attributes: {
      name: "Зөвлөгөө",
      description: "Туслах зөвлөгөө",
      color: "#2E7D32",
      documents: {
        data: [
          {
            id: "7",
            type: "document",
            attributes: {
              title: "Markdown дэмжлэг",
              created_at: "2025-02-01T09:00:00Z",
              updated_at: "2025-03-12T11:45:00Z",
              workspace_id: "1",
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
      name: "Анхааруулга",
      description: "Анхааралтай хэрэглэнэ үү",
      color: "#F9A825",
      documents: {
        data: [
          {
            id: "8",
            type: "document",
            attributes: {
              title: "Медиа оруулах",
              created_at: "2025-02-05T13:20:00Z",
              updated_at: "2025-03-15T14:30:00Z",
              workspace_id: "1",
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
      name: "Санаа",
      description: "Бүтээлч бодол",
      color: "#1565C0",
      documents: {
        data: [
          {
            id: "7",
            type: "document",
            attributes: {
              title: "Markdown дэмжлэг",
              created_at: "2025-02-01T09:00:00Z",
              updated_at: "2025-03-12T11:45:00Z",
              workspace_id: "1",
            },
          },
          {
            id: "8",
            type: "document",
            attributes: {
              title: "Медиа оруулах",
              created_at: "2025-02-05T13:20:00Z",
              updated_at: "2025-03-15T14:30:00Z",
              workspace_id: "1",
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
      name: "Лавлах",
      description: "Дэлгэрэнгүй уншихад зориулав",
      color: "#6A1B9A",
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
      title: "Хэрхэн хийх зааврууд",
      updated_at: "2025-03-18T12:00:00Z",
      user: { data: CURRENT_USER },
      is_template: true,
      workspace_id: "1",
    },
  },
  {
    id: "2",
    type: "document",
    attributes: {
      title: "Эхлэлийн зааврууд",
      updated_at: "2025-03-18T12:00:00Z",
      user: { data: CURRENT_USER },
      is_template: true,
      workspace_id: "1",
    },
  },
];

export const ISSUEDATA: IssueItem[] = [
  {
    id: "1",
    type: "issue",
    attributes: {
      title: "Нүүр хуудас",
      description: "",
      status: "in_progress", // in_progress
      priority: "medium", // medium
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
      title: "Агуулгын жагсаалт",
      description: "",
      status: "open", // open
      priority: "low",
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
      title: "Хайлтын үйлдлийг сайжруулах",
      description:
        "Хэрэглэгчид шүүлтүүртэй хайлтаар зөрүүтэй үр дүн гарч байгааг мэдээлсэн.",
      status: "closed", // closed
      priority: "high", // high
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
              title: "Хайлтын боломжийн шаардлагууд",
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
              workspace_id: "1",
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
        "API (Аппликейшн Програм Интерфэйс) нь програмууд хооронд харилцах боломжийг олгодог.",
      created_at: "2024-11-01T10:00:00Z",
    },
  },
  {
    id: "2",
    type: "glossary",
    attributes: {
      name: "Фронтенд",
      content:
        "Фронтенд бол хэрэглэгч шууд харьцдаг вэбсайт эсвэл аппликейшны хэсэг юм.",
      created_at: "2024-11-05T14:30:00Z",
    },
  },
  {
    id: "3",
    type: "glossary",
    attributes: {
      name: "Бэкэнд",
      content:
        "Бэкэнд нь сервер талын бизнесийн логик, өгөгдлийн сангийн ажиллагааг хариуцдаг хэсэг юм.",
      created_at: "2024-11-10T08:45:00Z",
    },
  },
];

const MOCK_DOCUMENT: DocumentItem = {
  id: "doc-1",
  type: "document",
  attributes: {
    title: "How APIs Work",
    workspace_id: "2",
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

export const topics: DocumentItem[] = [
  {
    id: "1",
    type: "document",
    attributes: {
      title: "Эхлүүлэх гарын авлага",
      user: {
        data: {
          id: "u1",
          type: "user",
          attributes: {
            uid: "tg123",
            email: "tuguldur@example.com",
            firstname: "Төгөлдөрчимэг",
            lastname: "Рэнчинчимэ",
            avatar: "/avatars/tuguldur.png",
          },
        },
      },
      view_count: 234,
      workspace_id: "2",
    },
  },
  {
    id: "2",
    type: "document",
    attributes: {
      title: "Ерөнхий танилцуулга",
      user: {
        data: {
          id: "u1",
          type: "user",
          attributes: {
            uid: "tg123",
            email: "tuguldur@example.com",
            firstname: "Төгөлдөрчимэг",
            lastname: "Рэнчинчимэ",
            avatar: "/avatars/tuguldur.png",
          },
        },
      },
      view_count: 198,
      workspace_id: "2",
    },
  },
  {
    id: "3",
    type: "document",
    attributes: {
      title: "Загвар - Асуудал шийдвэрлэх заавар",
      user: {
        data: {
          id: "u2",
          type: "user",
          attributes: {
            uid: "kkk001",
            email: "kkk@example.com",
            firstname: "Тест",
            lastname: "Хэрэглэгч",
            avatar: "/avatars/kkk.png",
          },
        },
      },
      view_count: 142,
      workspace_id: "2",
    },
  },
  {
    id: "4",
    type: "document",
    attributes: {
      title: "Загвар - Хэрхэн хийх заавар",
      user: {
        data: {
          id: "u2",
          type: "user",
          attributes: {
            uid: "kkk001",
            email: "kkk@example.com",
            firstname: "Тест",
            lastname: "Хэрэглэгч",
            avatar: "/avatars/kkk.png",
          },
        },
      },
      view_count: 95,
      workspace_id: "2",
    },
  },
  {
    id: "5",
    type: "document",
    attributes: {
      title: "Тест бичиг баримт",
      user: {
        data: {
          id: "u2",
          type: "user",
          attributes: {
            uid: "kkk001",
            email: "kkk@example.com",
            firstname: "Тест",
            lastname: "Хэрэглэгч",
            avatar: "/avatars/kkk.png",
          },
        },
      },
      view_count: 77,
      workspace_id: "2",
    },
  },
  {
    id: "6",
    type: "document",
    attributes: {
      title: "2025-03-18 Хурлын тэмдэглэл",
      user: {
        data: {
          id: "u1",
          type: "user",
          attributes: {
            uid: "tg123",
            email: "tuguldur@example.com",
            firstname: "Төгөлдөрчимэг",
            lastname: "Рэнчинчимэ",
            avatar: "/avatars/tuguldur.png",
          },
        },
      },
      view_count: 120,
      workspace_id: "2",
    },
  },
];
