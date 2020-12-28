import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import styles from "./../styles/auth.module.scss";
import Form from "../components/form/Form";
import FormTextField from "../components/form/FormTextField";
import SubmitButton from "../components/form/SubmitButton";
import FormCheckbox from "./../components/form/FormCheckbox";
import AuthFooter from "../components/AuthFooter";
import AuthFormWrapper from "../components/AuthFormWrapper";

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name is not a valid string.")
    .min(2, "First name must have minimum 2 character."),
  last_name: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Last name is not a valid string.")
    .required("Last name is required")
    .min(2, "Last name must have minimum 2 character."),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
  terms: Yup.boolean().oneOf([true], "You must accept terms and conditions."),
});

const Register = () => {
  const register = (data, { setStatus }) => {
    if (!data.terms)
      return setStatus({
        details: "You must accept the terms and conditions.",
      });
    setStatus({});
    console.log(data);
  };

  return (
    <AuthFormWrapper>
      <Form
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          terms: false,
        }}
        onSubmit={register}
        validationSchema={validationSchema}
        className={`${styles.auth_card} ${styles.auth_card__signup} shadow-md bg-white mt-3.5  md:mt-0`}
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
          label="Email"
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
        <FormCheckbox
          LabelComponent={() => (
            <Link
              className="transition duration-500 ease-in-out underline text-green-500 hover:text-green-700"
              to="/term_and_conditions"
            >
              Terms and Conditions
            </Link>
          )}
          name="terms"
        />
        <div className="m-6"></div>
        <SubmitButton title="Sing up" />
        <AuthFooter
          to="/login"
          message="Already have an account?"
          linkTitle=" Login here."
        />
      </Form>
    </AuthFormWrapper>
  );
};

export default Register;
