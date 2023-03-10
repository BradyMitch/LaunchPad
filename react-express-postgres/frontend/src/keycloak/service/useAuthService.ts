import { useContext, useMemo } from 'react';

import { AuthContext } from '../KeycloakProvider';
import decodeJWT from '../utils/decodeJWT';
import AuthActionType from './authActions';

const { SET_TOKEN } = AuthActionType;

/**
 * A custom hook that provides authentication-related functionality to other components.
 * @returns {Object} - An object containing authentication-related functions
 * and the current authentication state.
 */
const useAuthService = () => {
  // Get the authentication state and dispatch function from the authentication context.
  const { state, dispatch } = useContext<any>(AuthContext);

  // Use useMemo to memoize the returned object and prevent unnecessary re-renders.
  return useMemo(() => {
    const getLoginURL = () => '/api/oauth/login';
    const getLogoutURL = () => '/api/oauth/logout';

    // Sets the user information in the authentication state using a JWT token.
    const setUserInfo = (token: string) => {
      const decodedToken = decodeJWT(token);
      dispatch({
        type: SET_TOKEN,
        payload: { accessToken: token, userInfo: decodedToken },
      });
    };

    return {
      getLoginURL,
      getLogoutURL,
      setUserInfo,
      state,
    };
  }, [state]);
};

export default useAuthService;
