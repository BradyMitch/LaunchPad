// Defines the possible types of authentication actions.
export enum AuthActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  SET_TOKEN = 'SET_TOKEN',
}

export declare interface AuthState {
  accessToken: string;
  userInfo?: Record<string, any>;
}

export declare interface AuthAction {
  type: AuthActionType;
  payload?: { accessToken?: string; userInfo?: Record<string, any> };
}

// CONSTANTS
declare const initialState: AuthState;

// FUNCTIONS
declare function reducer(state: AuthState, action: AuthAction): AuthState;
declare function setUserInfo(token: string): void;
