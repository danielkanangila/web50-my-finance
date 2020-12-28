import { useLocalStorage } from "./useLocalStorage";
import useApi from "./useApi";
import authApiFunc from "./../api/auth";

const useAuth = (authFunc) => {
  const [user, setUser] = useLocalStorage("user", null);
  const authApi = useApi(authFunc);

  const signup = async (
    data,
    { setErrors, setStatus, resetForm },
    onSuccess
  ) => {
    if (authFunc.name !== authApiFunc.register.name)
      throw Error(
        `Invalid authentication api function [${authFunc.name}]. Should be [${authApiFunc.register.name}]`
      );
    // set form status to loading to true
    setStatus({ loading: true });
    const response = await authApi.request({ ...data, username: data.email });
    // handle response error if any
    if (!response.ok) {
      console.log(response);
      let error = response.data;
      // change the email message
      if (
        "email" in response.data &&
        response.data.email.join(" ").includes("must be unique")
      )
        error.email = "This email is already taken.";
      // set the errors to the form errors
      setErrors(error);
      // set form loading status to false
      setStatus({ loading: false });
      return;
    }
    // handle response success
    // set user to the local storage
    setUser(response.data);
    // set form loading status to false
    setStatus({ loading: false });
    // reset the form
    resetForm();
    // call the callback function
    onSuccess();
  };

  const login = (user) => setUser(user);

  const logout = () => localStorage.removeItem("user");

  const refresh = (freshUser) => {
    setUser({
      ...user,
      user: freshUser,
    });
  };

  return { ...user, login, logout, signup, refresh };
};

export default useAuth;
