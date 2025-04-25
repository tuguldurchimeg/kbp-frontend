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

  //
  WORKSPACES: "/v1/workspaces",
  DOCUMENTS: "/v1/documents",
  TAGS: "/v1/tags",
  GLOSSARIES: "/v1/glossaries",
  CATEGORIES: "/v1/categories",
  ISSUES: "/v1/issues",
  SEOS: "/v1/seos",
};

export const excludeURI = [
  URI.LOGIN,
  URI.LOGOUT,
  URI.RESET_PASSWORD,
  URI.CONFIRM_PASSWORD,
  URI.FORGOT_PASSWORD,
  URI.REFRESH,
];
