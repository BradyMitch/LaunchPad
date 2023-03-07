import { AuthContext } from 'providers/AuthProvider';
import { useContext, useMemo } from 'react';
import { decodeJWT } from 'utils';

import { SET_TOKEN } from './authActions';

const useAuthService = () => {
  const { state, dispatch } = useContext<any>(AuthContext);

  return useMemo(() => {
    const getLoginURL = () => '/api/oauth/login';
    const getLogoutURL = () => '/api/oauth/logout';

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
