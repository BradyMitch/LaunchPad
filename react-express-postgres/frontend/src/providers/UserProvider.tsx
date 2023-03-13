import BaseProvider from 'providers/BaseProvider';
import React, { createContext, ReactNode } from 'react';
import { initialState, reducer } from 'services/users/userReducer';

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
