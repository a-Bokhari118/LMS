import { useReducer, createContext } from 'react';

const intialState = {
  user: null,
};

// Create Context
const Context = createContext();

// Root reducer

const rootReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

// Context provider

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, intialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
