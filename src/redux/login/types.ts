export enum LoginActions {
  DO_LOGIN = "DO_LOGIN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILED = "LOGIN_FAILED",
  CHANGE_AVATAR = "CHANGE_AVATAR",
  CHANGE_NAME = "CHANGE_NAME"
}

export interface LoginState {
  isLoggedIn: boolean;
  user: any;
  errorText: string;
  isAdmin: boolean;
  loading: boolean;
  token: string;
  avatar: string,
  firstName: string,


}
export interface DoLoginProps {
  email: string;
  password: string;
  payloadFunc: Function;
}
export interface LoginRequest {
  email: string;
  password: string;
}


export interface LoginResult {
  token: string;
}