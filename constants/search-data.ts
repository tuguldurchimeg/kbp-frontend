import { FileItem, DocumentItem, CategoryItem } from "@/types/document";

export const placeholderData = {
  categories: [
    {
      id: "1",
      type: "category",
      attributes: {
        name: "OpenID",
      },
    },
    {
      id: "2",
      type: "category",
      attributes: {
        name: "Ангилал ба дэд ангилал",
      },
    },
    {
      id: "3",
      type: "category",
      attributes: {
        name: "Custom CSS & JavaScript",
      },
    },
  ] as CategoryItem[],

  documents: [
    {
      id: "doc-1",
      type: "document",
      attributes: {
        title: "Туршилтын төсөл үүсгэх",
        workspace_id: "ws-1",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Үйлдвэрлэлд оруулахаас өмнө санаагаа туршихын тулд sandbox төсөл хэрхэн үүсгэхийг сураарай.",
                },
              ],
            },
          ],
        },
        category: {
          data: {
            id: "1",
            type: "category",
            attributes: {
              name: "OpenID",
            },
          },
        },
      },
    },
    {
      id: "doc-2",
      type: "document",
      attributes: {
        title: "Freshmarketer",
        workspace_id: "ws-1",
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Freshmarketer нь A/B тест болон дулаан зураг ашиглан хэрэглэгчийн туршлагыг оновчтой болгодог.",
                },
              ],
            },
          ],
        },
        category: {
          data: {
            id: "2",
            type: "category",
            attributes: {
              name: "Ангилал ба дэд ангилал",
            },
          },
        },
      },
    },
  ] as DocumentItem[],

  files: [
    {
      id: "file-1",
      type: "file",
      attributes: {
        name: "UI-Заавар",
        url: "https://s3.amazonaws.com/bucket-name/UI-Guide.pdf",
        size: "1.2 MB",
        file_type: "pdf",
        documents: {
          data: [
            {
              id: "doc-1",
              type: "document",
              attributes: {
                title: "Туршилтын төсөл үүсгэх",
                workspace_id: "ws-1",
                content: { type: "doc", content: [] },
                category: {
                  data: {
                    id: "1",
                    type: "category",
                    attributes: { name: "OpenID" },
                  },
                },
              },
            },
          ],
        },
      },
    },
    {
      id: "file-2",
      type: "file",
      attributes: {
        name: "Брендийн хөрөнгүүд",
        url: "https://s3.amazonaws.com/bucket-name/BrandAssets.zip",
        size: "8.4 MB",
        file_type: "xls",
        documents: {
          data: [
            {
              id: "doc-2",
              type: "document",
              attributes: {
                title: "Freshmarketer",
                workspace_id: "ws-1",
                content: { type: "doc", content: [] },
                category: {
                  data: {
                    id: "2",
                    type: "category",
                    attributes: { name: "Ангилал ба дэд ангилал" },
                  },
                },
              },
            },
          ],
        },
      },
    },
    {
      id: "file-3",
      type: "file",
      attributes: {
        name: "Баримт бичгийн тойм",
        url: "https://s3.amazonaws.com/bucket-name/DocsOverview.md",
        size: "350 KB",
        file_type: "pdf",
        documents: {
          data: [
            {
              id: "doc-3",
              type: "document",
              attributes: {
                title: "API тойм",
                workspace_id: "ws-2",
                content: { type: "doc", content: [] },
                category: {
                  data: {
                    id: "3",
                    type: "category",
                    attributes: { name: "Custom CSS & JavaScript" },
                  },
                },
              },
            },
          ],
        },
      },
    },
    {
      id: "file-4",
      type: "file",
      attributes: {
        name: "Судалгааны тэмдэглэл",
        url: "https://s3.amazonaws.com/bucket-name/ResearchNotes.docx",
        size: "2.7 MB",
        file_type: "docx",
        documents: {
          data: [
            {
              id: "doc-4",
              type: "document",
              attributes: {
                title: "Хэрэглэгчийн дүрүүд",
                workspace_id: "ws-3",
                content: { type: "doc", content: [] },
                category: {
                  data: {
                    id: "4",
                    type: "category",
                    attributes: { name: "UX судалгаа" },
                  },
                },
              },
            },
            {
              id: "doc-5",
              type: "document",
              attributes: {
                title: "Судалгааны үр дүн",
                workspace_id: "ws-3",
                content: { type: "doc", content: [] },
                category: {
                  data: {
                    id: "4",
                    type: "category",
                    attributes: { name: "UX судалгаа" },
                  },
                },
              },
            },
            {
              id: "doc-6",
              type: "document",
              attributes: {
                title: "Өрсөлдөөний шинжилгээ",
                workspace_id: "ws-3",
                content: { type: "doc", content: [] },
                category: {
                  data: {
                    id: "4",
                    type: "category",
                    attributes: { name: "UX судалгаа" },
                  },
                },
              },
            },
            {
              id: "doc-7",
              type: "document",
              attributes: {
                title: "Шинэ боломжийн хүсэлтүүд",
                workspace_id: "ws-3",
                content: { type: "doc", content: [] },
                category: {
                  data: {
                    id: "4",
                    type: "category",
                    attributes: { name: "UX судалгаа" },
                  },
                },
              },
            },
          ],
        },
      },
    },
    // ...remaining files can be updated similarly if needed
  ] as FileItem[],
};
