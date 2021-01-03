import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Logout = () => {
  const auth = useAuth();
  const history = useHistory();

  useEffect(() => {
    auth.logout();
    history.push("/login");
    return () => {};
  });

  return <></>;
};

export default Logout;
