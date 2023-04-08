import React, { Context as ContextType, ReactNode, useReducer } from 'react';

interface IBaseProvider<ContextObjType, StateType, ChildCompsType> {
  Context: ContextType<ContextObjType>;
  reducer: (state: StateType, action: any) => StateType;
  initialState: StateType;
  children: ChildCompsType;
}

/**
 * Generic React context provider, designed to keep the creation of providers "D.R.Y.".
 * Makes use of React's useReducer hook which allows for Redux-esque data management.
 *
 * @link [React useReducer Explanation](https://dmitripavlutin.com/react-usereducer/)
 *
 * @author Zach Bourque & Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param Context The context of the given piece of state, this is what gets returned from React.useContext
 * @param reducer The reducer for the piece of state.
 * @param initialState The initial values for the piece of state.
 * @param children The child component of this component
 */
const BaseProvider = <
  ContextObjType extends Record<string, any>,
  StateType extends Record<string, any>,
  ChildCompsType extends ReactNode,
>(
  props: IBaseProvider<ContextObjType, StateType, ChildCompsType>,
) => {
  const { Context, reducer, initialState, children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch } as unknown as ContextObjType}>
      {children}
    </Context.Provider>
  );
};

export default BaseProvider;
