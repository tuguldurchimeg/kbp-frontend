import { URI } from "@/constants/uri.constants";
import api from "../app/lib/api";
import { CurrentUser, UserLoginParams } from "@/types/user";

export const loginService = async (
  params: UserLoginParams
): Promise<CurrentUser> => {
  const { data } = await api.post<CurrentUser>(URI.LOGIN, params);
  localStorage.setItem("access_token", data.access_token);
  return data;
};

export const logoutService = async (): Promise<void> => {
  await api.post(URI.LOGOUT);
  localStorage.removeItem("access_token");
};

export const refreshTokenService = async (
  refresh_token: string
): Promise<Pick<CurrentUser, "access_token" | "refresh_token">> => {
  const { data } = await api.post(URI.REFRESH, { refresh_token });
  return data;
};
