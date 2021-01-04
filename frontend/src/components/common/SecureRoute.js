import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useLocalStorage } from "../../hooks/useLocalStorage";

const SecureRoute = ({ component: Component, children, ...restOfProps }) => {
  const [user] = useLocalStorage("user", null);

  return (
    <Route
      {...restOfProps}
      render={(props) => {
        if (user && Component) return <Component {...props} />;
        if (user && !Component && children) return <>{children}</>;
        return <Redirect to="/login" />;
      }}
    />
  );
};

export default SecureRoute;
