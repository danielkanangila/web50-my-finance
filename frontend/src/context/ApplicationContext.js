import React, { createContext, useReducer } from "react";
import { reducer } from "./reducers";

const initialState = {
  auth: null,
};

export const ApplicationContext = createContext();

const ApplicationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ApplicationContext.Provider value={[state, dispatch]}>
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
