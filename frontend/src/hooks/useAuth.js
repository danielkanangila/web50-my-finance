import { useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";
import useApi from "./useApi";
import authApiFunc from "./../api/auth";
import { handleFormSubmission, request } from "../utils";
import { ApplicationContext } from "../context/ApplicationContext";
import { deleteAuth, setAuth } from "../context/actions";

/**
 * Authentication hook
 * @param {Function} authFunc api call helper function
 */
const useAuth = (authFunc) => {
  const [authToken, setAuthToken] = useLocalStorage("authToken", null); // browser local storage
  const [{ auth }, dispatch] = useContext(ApplicationContext); // Application context state and dispatch function
  const authApi = useApi(authFunc);

  /**
   * Set user information in the application context and set the token to the local storage
   * @param {object} user user profile info and authentication token from the backend
   */
  const _setAuth = (user) => {
    setAuthToken({
      expiry: user.expiry,
      token: user.token,
    });
    // set user to the application context state
    dispatch(setAuth(user.user));
  };

  const signup = async (data, formHandler, onSuccess) => {
    if (authFunc.name !== authApiFunc.register.name)
      throw Error(
        `Invalid authentication api function [${authFunc.name}]. Should be [${authApiFunc.register.name}]`
      );
    const _request = async () =>
      await authApi.request({ ...data, username: data.email });

    const _handleError = (error, setErrors, setStatus) => {
      // change the email message
      if ("email" in error && error.email.join(" ").includes("must be unique"))
        error.email = "This email is already taken.";
      // set the errors to the form errors
      setErrors(error);
      // set form loading status to false
      setStatus({ loading: false });
      return;
    };
    // call the form handler function to process the form submission
    await handleFormSubmission(
      _request,
      formHandler,
      onSuccess,
      _setAuth,
      _handleError
    );
  };

  const login = async (data, formHandler, onSuccess) => {
    if (authFunc.name !== authApiFunc.login.name)
      throw Error(
        `Invalid authentication api function [${authFunc.name}]. Should be [${authApiFunc.login.name}]`
      );
    // request helper function
    const _request = async () =>
      await authApi.request(data.username, data.password);
    // call the form handler function to process the form submission
    await handleFormSubmission(_request, formHandler, onSuccess, _setAuth);
  };

  const logout = async () => {
    await request(authApiFunc.logout);
    localStorage.removeItem("user");
    dispatch(deleteAuth());
    return true;
  };

  const refresh = async () => {
    /**
     * check if authToken is not expired before to fetch the auth user
     * otherwise call the login function and return
     * ::TODO handle invalid token refresh
     */
    if (authToken) {
      const expiryDate = new Date(authToken.expiry);
      // if auth token is valid but the auth state is empty (when window is reload),
      // fetch the auth user profile info
      if (expiryDate > new Date() && !auth) {
        // fetch user profile info from the backend
        const response = await request(authApiFunc.getUser);
        // ::TODO handle user fetching error
        if (!response.ok) return;
        // if not error, set user to the application context state
        dispatch(setAuth(response.data));
      }
    }
  };

  return { authToken, login, logout, signup, refresh, user: auth };
};

export default useAuth;
