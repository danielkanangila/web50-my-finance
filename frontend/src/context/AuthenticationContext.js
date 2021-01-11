import React, { createContext, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const AuthenticationContext = createContext();

const AuthenticationContextProvider = ({ children }) => {
  const auth = useAuth();
  const [state, dispatch] = useReducer(() => {}, auth);
  const history = useHistory();

  useEffect(() => {
    // refresh user info if auth token still valid but the state of the application context
    // does not contain user info, case of page reloading. Otherwise, case auth token is expired,
    // delete auth token from local storage and redirect to the login page.
    // The callback function passed in parameter will be called only the auth token is expired
    auth.refresh((expiredToken, setAuthToken) => {
      if (expiredToken) {
        // remove the expired auth token
        setAuthToken(null);
        // them redirect to login
        history.push("/login");
      }
    });
  });

  return (
    <AuthenticationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
