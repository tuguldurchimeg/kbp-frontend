import { URI } from "@/constants/uri.constants";
import api from "../../../../utils/api";
import { CurrentUser, SocialLoginParams, UserLoginParams } from "@/types/user";

export const loginService = async (
  params: UserLoginParams
): Promise<CurrentUser> => {
  const { data } = await api.post<CurrentUser>(URI.LOGIN, params);
  return data;
};

export const logoutService = async (): Promise<void> => {
  await api.post(URI.LOGOUT);
  localStorage.removeItem("authUser");
};

export const refreshTokenService = async (
  refresh_token: string
): Promise<Pick<CurrentUser, "access_token" | "refresh_token">> => {
  const { data } = await api.post(URI.REFRESH, { refresh_token });
  return data;
};

export const googleLoginService = async (
  params: SocialLoginParams
): Promise<CurrentUser> => {
  const { data } = await api.post<CurrentUser>(URI.GOOGLE_LOGIN, params);
  return data;
};
