import { useContext, useMemo } from 'react';

import { AuthContext } from '../KeycloakProvider';
import decodeJWT from '../utils/decodeJWT';
import { AuthActionType } from './index.d.ts';

const { SET_TOKEN } = AuthActionType;

/**
 * A custom hook that provides authentication-related functionality to other components.
 * @returns {Object} - An object containing authentication-related functions
 * and the current authentication state.
 */
export const useAuthService = () => {
  // Get the authentication state and dispatch function from the authentication context.
  const { state, dispatch } = useContext(AuthContext);

  // Use useMemo to memoize the returned object and prevent unnecessary re-renders.
  return useMemo(() => {
    const getLoginURL = () => '/api/oauth/login';
    const getLogoutURL = () => '/api/oauth/logout';

    // Sets the user information in the authentication state using a JWT token.
    const setUserInfo = (token) => {
      const decodedToken = decodeJWT(token);
      dispatch({
        type: SET_TOKEN,
        payload: { accessToken: token, userInfo: decodedToken },
      });
    };

    // Return true if the user has the specified role.
    const hasRole = (role) => {
      const roles = state.userInfo?.client_roles;
      return roles ? roles.includes(role) : false;
    };

    // Get a new access token using the refresh token.
    const refreshAccessToken = async () => {
      const response = await fetch('/api/oauth/token', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const { access_token } = await response.json();
        const decodedToken = decodeJWT(access_token);
        dispatch({
          type: SET_TOKEN,
          payload: { accessToken: access_token, userInfo: decodedToken },
        });
      }
    };

    return {
      getLoginURL,
      getLogoutURL,
      setUserInfo,
      refreshAccessToken,
      hasRole,
      state,
    };
  }, [state]);
};

export default useAuthService;
