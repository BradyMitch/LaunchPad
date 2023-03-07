import { UserContext } from 'providers/UserProvider';
import { useContext, useMemo } from 'react';

import { GET_USERS } from './userActions';

const useUserService = () => {
  const { state, dispatch } = useContext<any>(UserContext);

  return useMemo(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`/api/users`);
        const data = await res.json();
        dispatch({ type: GET_USERS, payload: data });
      } catch (e) {
        console.error(e);
      }
    };

    return {
      getUsers,
      state,
    };
  }, [state, dispatch]);
};

export default useUserService;
