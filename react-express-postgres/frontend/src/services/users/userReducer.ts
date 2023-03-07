import { GET_USERS } from './userActions';

export const initialState = {};

export const reducer = (state: typeof initialState, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
};
