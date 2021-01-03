import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useLocalStorage } from "../../hooks/useLocalStorage";

const SecureRoute = ({ component: Component, ...restOfProps }) => {
  const [user] = useLocalStorage("user", null);

  return (
    <Route
      {...restOfProps}
      render={(props) => {
        if (user) return <Component {...props} />;
        return <Redirect to="/login" />;
      }}
    />
  );
};

export default SecureRoute;
