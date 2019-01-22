import { Action } from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_TOKEN = 'SET_TOKEN';

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;

  constructor(public payload: { username: string; password: string }) {}
}

export class SignupUser implements Action {
  readonly type = SIGNUP_USER;
}

export class TrySingin implements Action {
  readonly type = TRY_SIGNIN;

  constructor(public payload: { username: string; password: string }) {}
}

export class SigninUser implements Action {
  readonly type = SIGNIN_USER;
}

export class LogoutUser implements Action {
  readonly type = LOGOUT_USER;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) {}
}

export type AuthActions =
  | SignupUser
  | SigninUser
  | LogoutUser
  | SetToken
  | TrySignup
  | TrySingin;

