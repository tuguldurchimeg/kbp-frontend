const API = process.env.NEXT_PUBLIC_BASE_URL;

export const URI = {
  API,
  LOGIN: "/v1/login",
  LOGOUT: "/v1/logout",
  REFRESH: "/v1/refresh_token",
  FORGOT_PASSWORD: "/v1/passwords/forgot",
  CONFIRM_PASSWORD: "/v1/passwords/confirm",
  RESET_PASSWORD: "/v1/passwords/reset",
  CHANGE_PASSWORD: "/v1/passwords/change",
  PROFILE: "/v1/employee/users/profile",
  S3_PRESIGNED_URL: "/v1/s3/presigned_url",

  //
  WORKSPACES: "/v1/workspaces",
  CATEGORIES: "/v1/documents/categories",
  DOCUMENTS: "/v1/documents/documents",
  ISSUES: "/v1/documents/issues",
  TAGS: "/v1/tools/tags",
  GLOSSARIES: "/v1/tools/glossaries",
  SEOS: "/v1/tools/seos",
};

export const excludeURI = [
  URI.LOGIN,
  URI.LOGOUT,
  URI.RESET_PASSWORD,
  URI.CONFIRM_PASSWORD,
  URI.FORGOT_PASSWORD,
  URI.REFRESH,
];
