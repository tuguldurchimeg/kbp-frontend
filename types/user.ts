export type CompanyItem = {
  id: string;
  type: "company";
  attributes: {
    name: string;
    uid: string;
  };
};
export type UserItem = {
  id: string;
  type: "user";
  attributes: {
    uid: string;
    email: string;
    firstname: string;
    lastname: string;
    avatar: string;
    company: { data: CompanyItem };
    issues?: string;
  };
};

export type EmployeeUpdateParams = {
  id: string;
  params: EmployeeCreateParams;
};

export type EmployeeCreateParams = {
  firstname: string;
  lastname: string;
  email: string;
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

export type SocialLoginParams = {
  access_token: string;
};

export interface CreateUserParams {
  email: string;
  firstname: string;
  lastname: string;
  avatar?: string;
}

export interface UpdateUserParams {
  id: string;
  params: CreateUserParams;
}

export interface PasswordChangeParams {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
}

export interface SignupParams {
  email: string;
  firstname: string;
  lastname: string;
  company: string;
  password: string;
  password_confirm: string;
}
