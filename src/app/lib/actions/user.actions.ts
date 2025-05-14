import { URI } from "@/constants/uri.constants";
import {
  CreateUserParams,
  PasswordChangeParams,
  UpdateUserParams,
  UserItem,
} from "@/types/user";
import api from "@/utils/api";

export async function fetchProfile(): Promise<UserItem> {
  const res = await api.get(URI.PROFILE);
  return res.data.data;
}

export async function createUser(params: CreateUserParams): Promise<UserItem> {
  const res = await api.post(URI.USERS, { data: params });
  return res.data.data;
}

export async function updateUser(arg: UpdateUserParams): Promise<UserItem> {
  const res = await api.put(`${URI.USERS}/${arg.id}`, arg.params);
  return res.data.data;
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`${URI.USERS}/${id}`);
}

export async function forgotPassword(email: string): Promise<void> {
  await api.post(URI.FORGOT_PASSWORD, { email });
}

export async function updatePassword(
  params: PasswordChangeParams
): Promise<void> {
  await api.post(URI.CHANGE_PASSWORD, params);
}

export async function getUsers(): Promise<UserItem[]> {
  const res = await api.get(URI.USERS);
  return res.data.data;
}
