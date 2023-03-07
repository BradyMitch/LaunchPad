import { LOGIN, LOGOUT, SET_TOKEN } from './authActions';

export const initialState = {
  accessToken: '',
  userInfo: undefined,
};

export const reducer = (state: typeof initialState, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload };
    case LOGOUT:
      return initialState;
    case SET_TOKEN:
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
};
