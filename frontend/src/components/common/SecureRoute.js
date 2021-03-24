import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useLocalStorage } from "../../hooks/useLocalStorage";

const SecureRoute = ({ component: Component, children, ...restOfProps }) => {
  const [token] = useLocalStorage("authToken", null);

  return (
    <Route
      {...restOfProps}
      render={(props) => {
        if (token && Component) return <Component {...props} />;
        if (token && !Component && children) return <>{children}</>;
        return <Redirect to="/login" />;
      }}
    />
  );
};

export default SecureRoute;
