import React from "react";
import TextField from "../components/TextField";

const Login = () => {
  return (
    <div>
      <TextField
        type="text"
        name="username"
        label="Username or Email"
        placeholder="example@gmail.com"
        required
      />
    </div>
  );
};

export default Login;
