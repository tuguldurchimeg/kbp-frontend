import { URI } from "@/constants/uri.constants";
import api from "./api";

export type UserLoginParams = {
  email: string;
  password: string;
};

export interface CurrentUser {
  id: number;
  email: string;
  uid: string;
  access_token: string;
  refresh_token: string;
  sign_in_count: number;
  password_change_required: boolean;
}

export const loginService = async (
  params: UserLoginParams
): Promise<CurrentUser> => {
  const { data } = await api.post<CurrentUser>(URI.LOGIN, params);
  return data;
};

export const logoutService = async (): Promise<void> => {
  await api.post(URI.LOGOUT);
};

export const refreshTokenService = async (
  refresh_token: string
): Promise<Pick<CurrentUser, "access_token" | "refresh_token">> => {
  const { data } = await api.post(URI.REFRESH, { refresh_token });
  return data;
};
