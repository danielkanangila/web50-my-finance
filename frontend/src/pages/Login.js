import React from "react";
import * as Yup from "yup";

import styles from "./../styles/auth.module.scss";
import TextField from "../components/TextField";
import Form from "../components/form/Form";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

const Login = () => {
  return (
    <div className={styles.auth_container}>
      <Form
        initialValues={{ username: "", password: "", remember_me: false }}
        onSubmit={() => {}}
        validationSchema={validationSchema}
        className={`${styles.auth_card} shadow-sm bg-white`}
      >
        <h1 className="main-title">Login</h1>
        <TextField
          type="text"
          name="username"
          label="Username or Email"
          placeholder="example@gmail.com"
          required
        />
      </Form>
    </div>
  );
};

export default Login;
