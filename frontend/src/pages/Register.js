import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import styles from "./../styles/auth.module.scss";
import Form from "../components/form/Form";
import FormTextField from "../components/form/FormTextField";
import SubmitButton from "../components/form/SubmitButton";
import FormCheckbox from "./../components/form/FormCheckbox";
import AuthFooter from "../components/AuthFooter";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required().max(2),
  first_name: Yup.string().required().max(2),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

const Register = () => {
  return (
    <div className={styles.auth_container}>
      <Form
        initialValues={{ username: "", password: "", remember_me: false }}
        onSubmit={() => {}}
        validationSchema={validationSchema}
        className={`${styles.auth_card} ${styles.auth_card__signup} shadow bg-white`}
        Title={() => <h1 className="main-title">Sign up</h1>}
      >
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <FormTextField
              type="text"
              name="first_name"
              label="First Name"
              placeholder="Dan"
              required
            />
          </div>
          <div className="m-2 md:m-1"></div>
          <div className="w-full md:w-1/2">
            <FormTextField
              type="text"
              name="last_name"
              label="Last Name"
              placeholder="Joe"
              required
            />
          </div>
        </div>
        <div className="m-4"></div>
        <FormTextField
          type="text"
          name="email"
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
        <FormCheckbox label="Terms and Conditions" name="terms" />
        <div className="m-6"></div>
        <SubmitButton title="Sing up" />
        <AuthFooter
          to="/login"
          message="Already have an account?"
          linkTitle=" Login here."
        />
      </Form>
    </div>
  );
};

export default Register;
