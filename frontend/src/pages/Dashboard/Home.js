import React from "react";
import useAuth from "../../hooks/useAuth";
import usePlaid from "../../hooks/usePlaid";
// import plaidApiFunc from "./../../api/plaid"

const Home = () => {
  const auth = useAuth();
  const plaid = usePlaid();

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
