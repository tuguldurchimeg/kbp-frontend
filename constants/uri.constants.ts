const API = process.env.NEXT_PUBLIC_BASE_URL;

export const URI = {
  API,
  LOGIN: "/v1/login",
  LOGOUT: "/v1/logout",
  REFRESH: "/v1/refresh_token",
  GOOGLE_LOGIN: "/v1/google_login",
  SIGNUP: "/v1/signup",
  FORGOT_PASSWORD: "/v1/passwords/forgot",
  RESET_PASSWORD: "/v1/passwords/reset",
  CHANGE_PASSWORD: "/v1/passwords/change",
  PROFILE: "/v1/profile",
  USERS: "/v1/users",
  S3_PRESIGNED_URL: "/v1/s3/presigned_url",

  WORKSPACES: "/v1/workspaces",
  WORKSPACE_ROLE: "/v1/workspace_role_details",
  CATEGORIES: "/v1/documents/categories",
  DOCUMENTS: "/v1/documents/documents",
  FILES: "/v1/documents/files",
  ISSUES: "/v1/documents/issues",
  ISSUE_COMMENTS: "/v1/documents/issue_comments",
  TAGS: "/v1/tools/tags",
  GLOSSARIES: "/v1/tools/glossaries",
};

export const excludeURI = [
  URI.LOGIN,
  URI.LOGOUT,
  URI.RESET_PASSWORD,
  URI.FORGOT_PASSWORD,
  URI.REFRESH,
  URI.SIGNUP,
  URI.GOOGLE_LOGIN,
  URI.S3_PRESIGNED_URL,
];
