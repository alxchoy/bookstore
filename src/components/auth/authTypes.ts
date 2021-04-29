export type UserForm = {
  email: string;
  password: string;
};

export interface IAuthContext {
  user: IUserState | null;
  authLogin(user: UserForm): void;
  authLogout(): void;
  authRegister(user: UserForm): void;
  authStatus: IAuthStatus;
}

export interface IUserState {
  email: string;
  emailVerified: boolean;
  uid: string;
}

export interface IAuthStatus {
  isLoading: boolean;
}
