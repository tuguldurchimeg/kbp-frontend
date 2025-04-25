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
  };
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
