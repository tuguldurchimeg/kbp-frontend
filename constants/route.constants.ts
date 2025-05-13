const workspaceBase = (id: string) => `/workspaces/${id}`;

export const ROUTE = {
  ROOT: "/",
  LOGIN: "/login",
  HELP: "/help",
  PROFILE: "/profile",
  WORKSPACES: {
    ROOT: "/workspaces",
    WORKSPACE: (id: string) => `${workspaceBase(id)}`,
  },
  BASE: {
    ISSUES: {
      ROOT: (workspaceId: string) => `${workspaceBase(workspaceId)}/issues`,
      DETAIL: (workspaceId: string, id: string) =>
        `${workspaceBase(id)}/issues/${id}`,
    },
    FILES: (workspaceId: string) => `${workspaceBase(workspaceId)}/files`,
    DOCUMENT: {
      DETAIL: (workspaceId: string, id: string) =>
        `${workspaceBase(workspaceId)}/documents/${id}`,
    },
  },
  TOOLS: {
    USER_ACCESS: {
      ROOT: (workspaceId: string) =>
        `${workspaceBase(workspaceId)}/tools/user_access`,
      DETAIL: (workspaceId: string, id: string) =>
        `${workspaceBase(workspaceId)}/tools/user_access/${id}`,
    },

    TEMPLATES: {
      ROOT: (workspaceId: string) =>
        `${workspaceBase(workspaceId)}/tools/templates`,
      DETAIL: (workspaceId: string, id: string) =>
        `${workspaceBase(workspaceId)}/tools/templates/${id}`,
    },

    TAGS: {
      ROOT: (workspaceId: string) => `${workspaceBase(workspaceId)}/tools/tags`,
      DETAIL: (workspaceId: string, id: string) =>
        `${workspaceBase(workspaceId)}/tools/tags/${id}`,
    },

    GLOSSARY: {
      ROOT: (workspaceId: string) =>
        `${workspaceBase(workspaceId)}/tools/glossaries`,
      DETAIL: (workspaceId: string, id: string) =>
        `${workspaceBase(workspaceId)}/tools/glossaries/${id}`,
    },

    SEO: {
      ROOT: (workspaceId: string) => `${workspaceBase(workspaceId)}/tools/seos`,
      DETAIL: (workspaceId: string, id: string) =>
        `${workspaceBase(workspaceId)}/tools/seos/${id}`,
    },
  },
};
