import { createContext, ReactNode } from 'react';
import React from 'react';
import { initialState, reducer } from 'services/users/userReducer';

import BaseProvider from './BaseProvider';

export const UserContext = createContext(initialState);

interface IUserProvider {
  children: ReactNode;
}

const UserProvider = (props: IUserProvider) => {
  const { children } = props;
  return (
    <BaseProvider Context={UserContext} initialState={initialState} reducer={reducer}>
      {children}
    </BaseProvider>
  );
};

export default UserProvider;
