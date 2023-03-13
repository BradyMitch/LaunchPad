import UserActionType from './userActions';
const { GET_USERS } = UserActionType;

export interface UserAction {
  type: UserActionType;
  payload?: object;
}

// Initial users state.
export const initialState = {};

/**
 * Handles users actions and returns the updated users state.
 * @param {object} state - The current users state.
 * @param {UserAction} action - The users action to be handled.
 * @returns {object} - The updated users state.
 */
export const reducer = (state: object, action: UserAction): object => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
};
