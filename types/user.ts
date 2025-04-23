export type CompanyItem = {
  id: string;
  name: string;
  uid: string;
};
export type UserItem = {
  id: string;
  uid: string;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
  company?: { data: CompanyItem };
};

export interface CurrentUser {
  id: number;
  uid: string;
  email: string;
  access_token: string;
  refresh_token: string;
  sign_in_count: number;
  password_change_required: boolean;
}

export type UserLoginParams = {
  email: string;
  password: string;
};
