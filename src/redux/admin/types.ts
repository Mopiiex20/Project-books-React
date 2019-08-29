export enum AdminActions {
  DO_ADMIN = "DO_ADMIN",
  ADMIN_SUCCESS = "ADMIN_SUCCESS",
  ADMIN_FAILED = "ADMIN_FAILED"
}

export interface adminUserData {
  email: string;
  password: string;
  isLoggedIn: boolean;
  user: any;
  errorText: string;

}

export interface AdminRequest {
  email: string;
  password: string;
}

export interface AdminState {
  booksData: any;
  usersData: any;
}

export interface ShowTable {
  email: string;
  password: string;
}


export interface AdminTableResult {
  data: object
}