import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import styles from "./../styles/auth.module.scss";
import Form from "../components/form/Form";
import FormTextField from "../components/form/FormTextField";
import SubmitButton from "../components/form/SubmitButton";
import FormCheckbox from "./../components/form/FormCheckbox";

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
        className={`${styles.auth_card} shadow bg-white`}
      >
        <h1 className="main-title">Login</h1>
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
        <SubmitButton
          title="Login"
          className="transition duration-500 ease-in-out w-full p-2 bg-green-500 hover:bg-green-600 rounded-md cursor-pointer text-white uppercase text-xs"
        />
        <div className="mt-5 mb-3 text-sm">
          Don't have an account?{" "}
          <Link
            className="transition duration-500 ease-in-out text-green-500 hover:underline"
            to="/register"
          >
            Register here.
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
