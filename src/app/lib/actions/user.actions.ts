import { URI } from "@/constants/uri.constants";
import {
  ConfirmCodeParams,
  EmployeeCreateParams,
  EmployeeUpdateParams,
  PasswordChangeParams,
  PasswordResetParams,
  UpdateUserParams,
  UserItem,
} from "@/types/user";
import api from "@/utils/api";

export async function fetchProfile(): Promise<UserItem> {
  const res = await api.get(URI.PROFILE);
  return res.data.data;
}

export async function getEmployees(): Promise<UserItem> {
  const res = await api.get(URI.USERS);
  return res.data.data;
}

export async function createEmployee(
  params: EmployeeCreateParams
): Promise<UserItem> {
  const res = await api.post(URI.USERS, params);
  return res.data.data;
}

export async function updateEmployee(
  arg: EmployeeUpdateParams
): Promise<UserItem> {
  const res = await api.put(`${URI.USERS}/${arg.id}`, arg.params);
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

export async function confirmCode(params: ConfirmCodeParams): Promise<void> {
  await api.post(URI.FORGOT_PASSWORD, { params });
}

export async function resetPassword(
  params: PasswordResetParams
): Promise<void> {
  await api.post(URI.RESET_PASSWORD, { params });
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
