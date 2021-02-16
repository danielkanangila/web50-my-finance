import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import usePlaid from "../../hooks/usePlaid";

const Home = () => {
  const auth = useAuth();
  const plaid = usePlaid();

  useEffect(() => {
    if (auth.user)
      plaid
        .fetchAccounts(auth.user.id)
        .then((_) => {})
        .catch((error) => console.log(error));
    return () => {};
  }, [auth.user]);

  return (
    <div>
      <h1>
        Welcome to your Dashboard!{" "}
        {auth?.user?.first_name + " " + auth?.user?.last_name}
      </h1>
      <button onClick={() => plaid.open()}>Add an account</button>
    </div>
  );
};

export default Home;
