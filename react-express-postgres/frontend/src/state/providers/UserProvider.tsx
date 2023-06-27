import React, { createContext, ReactNode } from 'react';
import BaseProvider from 'state/providers/BaseProvider';
import { initialState, reducer } from 'state/services/users/userReducer';

export const UserContext = createContext(initialState);

interface IUserProvider {
  children: ReactNode;
}

const UserProvider = ({ children }: IUserProvider) => {
  return (
    <BaseProvider Context={UserContext} initialState={initialState} reducer={reducer}>
      {children}
    </BaseProvider>
  );
};

export default UserProvider;
