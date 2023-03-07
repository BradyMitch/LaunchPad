import { createContext, ReactNode } from 'react';
import React from 'react';
import { initialState, reducer } from 'services/auth/authReducer';

import BaseProvider from './BaseProvider';

export const AuthContext = createContext(initialState);

interface IAuthProvider {
  children: ReactNode;
}

const AuthProvider = (props: IAuthProvider) => {
  const { children } = props;
  return (
    <BaseProvider Context={AuthContext} initialState={initialState} reducer={reducer}>
      {children}
    </BaseProvider>
  );
};

export default AuthProvider;
