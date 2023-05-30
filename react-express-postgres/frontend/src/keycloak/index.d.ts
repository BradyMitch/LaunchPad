import { AuthAction, AuthState } from './service';
import { Context, Dispatch, ReactNode } from 'react';

export { AuthAction, AuthState, AuthActionType } from './service';

// Interface that extends the AuthState interface and adds a dispatch function.
export interface AuthStateWithDispatch extends AuthState {
  dispatch: Dispatch<AuthAction>;
}

// PROPS
interface KeycloakProviderProps {
  children: ReactNode;
}
interface KeycloakWrapperProps {
  children: ReactNode;
}

// CONSTANTS
declare const AuthContext: Context<AuthState>;

// FUNCTIONS
declare function KeycloakProvider(props: KeycloakProviderProps): JSX.Element;
declare function KeycloakWrapper(props: KeycloakWrapperProps): JSX.Element;
