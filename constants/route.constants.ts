const workspaceBase = (id: string) => `/workspaces/${id}`;

export const ROUTE = {
  ROOT: "/",
  LOGIN: "/login",
  WORKSPACES: {
    ROOT: "/workspaces",
    WORKSPACE: (id: string) => `${workspaceBase(id)}`,
  },
  BASE: {
    ISSUES: {
      ROOT: (id: string) => `${workspaceBase(id)}/issues`,
      DETAIL: (id: string, issueId: string) =>
        `${workspaceBase(id)}/issues/${issueId}`,
    },

    DOCUMENT: {
      DETAIL: (id: string, docId: string) =>
        `${workspaceBase(id)}/documents/${docId}`,

      EDIT: (id: string, docId: string) =>
        `${workspaceBase(id)}/documents/${docId}/edit`,
    },
  },
  TOOLS: {
    USER_ACCESS: {
      ROOT: (id: string) => `${workspaceBase(id)}/tools/user-access`,
      DETAIL: (id: string, userId: string) =>
        `${workspaceBase(id)}/tools/user-access/${userId}`,
    },

    TEMPLATES: {
      ROOT: (id: string) => `${workspaceBase(id)}/tools/templates`,
      DETAIL: (id: string, templateId: string) =>
        `${workspaceBase(id)}/tools/templates/${templateId}`,
    },

    TAGS: {
      ROOT: (id: string) => `${workspaceBase(id)}/tools/tags`,
      DETAIL: (id: string, tagId: string) =>
        `${workspaceBase(id)}/tools/tags/${tagId}`,
    },

    GLOSSARY: {
      ROOT: (id: string) => `${workspaceBase(id)}/tools/glossaries`,
      DETAIL: (id: string, glossaryId: string) =>
        `${workspaceBase(id)}/tools/glossaries/${glossaryId}`,
    },

    SEO: {
      ROOT: (id: string) => `${workspaceBase(id)}/tools/seos`,
      DETAIL: (id: string, seoId: string) =>
        `${workspaceBase(id)}/tools/seos/${seoId}`,
    },
  },
};
