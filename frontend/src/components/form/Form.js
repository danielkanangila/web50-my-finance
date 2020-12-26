import React, { useRef, useEffect } from "react";
import { Formik } from "formik";

const Form = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  className,
  ...otherProps
}) => {
  const formRef = useRef(null);

  const hasNonFieldError = (error) => {
    return (error && error.non_field_errors) || (error && error.details);
  };

  const parseError = (error) => {
    return error.non_field_errors || error.details;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, status }) => (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className={`${className} shadow-sm rounded`}
          {...otherProps}
        >
          {hasNonFieldError(status) && <Error message={parseError(status)} />}
          {children}
        </form>
      )}
    </Formik>
  );
};

const Error = ({ message }) => {
  return <div>{message}</div>;
};

export default Form;
