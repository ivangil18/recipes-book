import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
}

const initialState = {
  token: null,
  authenticated: false
};

export function AuthReducers(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.SIGNUP_USER:
    case AuthActions.SIGNIN_USER:
      return {
        ...state,
        authenticated: true
      };
    case AuthActions.LOGOUT_USER:
      return {
        ...state,
        authenticated: false,
        token: null
      };
    case AuthActions.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
}
