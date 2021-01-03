import { useLocalStorage } from "./useLocalStorage";
import useApi from "./useApi";
import authApiFunc from "./../api/auth";
import { handleFormSubmission, request } from "../utils";

/**
 * Authentication hook
 * @param {Function} authFunc api call helper function
 */
const useAuth = (authFunc) => {
  const [user, setUser] = useLocalStorage("user", null);
  const authApi = useApi(authFunc);

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
      setUser,
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
    await handleFormSubmission(_request, formHandler, onSuccess, setUser);
  };

  const logout = () => {
    const response = request(authApiFunc.logout);
    if (response.ok) {
      localStorage.removeItem("user");
      return true;
    }
    return false;
  };

  const refresh = (freshUser) => {
    setUser({
      ...user,
      user: freshUser,
    });
  };

  return { ...user, login, logout, signup, refresh };
};

export default useAuth;
