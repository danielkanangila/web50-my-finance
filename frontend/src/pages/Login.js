import React from "react";
import * as Yup from "yup";

import styles from "./../styles/auth.module.scss";
import Form from "../components/form/Form";
import FormTextField from "../components/form/FormTextField";
import SubmitButton from "../components/form/SubmitButton";
import FormCheckbox from "./../components/form/FormCheckbox";
import AuthFooter from "../components/AuthFooter";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

const Login = () => {
  return (
    <div className={styles.auth_container}>
      <Form
        initialValues={{ username: "", password: "", remember_me: false }}
        onSubmit={() => {}}
        validationSchema={validationSchema}
        className={`${styles.auth_card} shadow-md bg-white`}
        Title={() => <h1 className="main-title">Sign In</h1>}
      >
        <FormTextField
          type="text"
          name="username"
          label="Username or Email"
          placeholder="example@gmail.com"
          required
        />
        <div className="m-4"></div>
        <FormTextField
          type="password"
          name="password"
          label="Password"
          placeholder="**********"
          required
        />
        <div className="m-6"></div>
        <FormCheckbox label="Remember me" name="remember_me" />
        <div className="m-6"></div>
        <SubmitButton title="Login" />
        <AuthFooter
          to="/register"
          message=" Don't have an account?"
          linkTitle=" Register here."
        />
      </Form>
    </div>
  );
};

export default Login;
