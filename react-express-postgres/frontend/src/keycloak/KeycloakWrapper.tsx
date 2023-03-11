import React, { ReactNode, useEffect } from 'react';

import useAuthService from './services/useAuthService';

interface IKeycloakWrapper {
  children: ReactNode;
}

const KeycloakWrapper = (props: IKeycloakWrapper) => {
  const { children } = props;
  const { setUserInfo } = useAuthService();

  useEffect(() => {
    // Get the current URL and its search parameters
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    const token = searchParams.get('token');
    if (token) {
      setUserInfo(token);
      // Remove the 'paramToRemove' query parameter
      searchParams.delete('token');

      // Create a new URL with the updated search parameters
      const newUrl = `${url.origin}${
        url.pathname === '/' ? '' : url.pathname
      }${searchParams.toString()}`;

      // Update the URL without reloading the page
      window.history.pushState({}, '', newUrl);
    }
  }, []);

  return <div>{children}</div>;
};

export default KeycloakWrapper;
