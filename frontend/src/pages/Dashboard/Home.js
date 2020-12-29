import React from "react";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const auth = useAuth();
  return (
    <div>
      <h1>
        Welcome to your Dashboard!{" "}
        {auth.user.first_name + " " + auth.user.last_name}
      </h1>
    </div>
  );
};

export default Home;
