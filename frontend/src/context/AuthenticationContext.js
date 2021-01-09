import React, { createContext, useEffect, useReducer } from "react";
import useAuth from "../hooks/useAuth";

export const AuthenticationContext = createContext();

const AuthenticationContextProvider = ({ children }) => {
  const auth = useAuth();
  const [state, dispatch] = useReducer(() => {}, auth);

  useEffect(() => {
    auth.refresh();
  });

  return (
    <AuthenticationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
