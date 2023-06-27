import { useContext, useMemo } from 'react';
import { UserContext } from 'state/providers/UserProvider';

import UserActionType from './userActions';

const { GET_USERS } = UserActionType;

/**
 * A custom hook that provides users-related functionality to other components.
 * @returns {Object} - An object containing users-related functions
 * and the current users state.
 */
const useUserService = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
