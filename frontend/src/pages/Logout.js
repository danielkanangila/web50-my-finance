import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Logout = () => {
  const auth = useAuth();
  const history = useHistory();

  const logout = async () => {
    const response = await auth.logout();
    if (response === false) return history.goBack();
    window.location = "/login";
  };

  useEffect(() => {
    logout();
  }, []);

  return <></>;
};

export default Logout;
