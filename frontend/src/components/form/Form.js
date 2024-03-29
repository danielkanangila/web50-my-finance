import React, { useRef } from "react";
import { Formik } from "formik";
import Banner from "../common/Banner";

const Form = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  className,
  Title = () => <></>, // form title component, by default empty component
  ...otherProps
}) => {
  const formRef = useRef(null);

  const hasNonFieldError = (error) => {
    return !!(error && error.non_field_errors) || !!(error && error.details);
  };

  const parseError = (error) => {
    if (!hasNonFieldError(error)) return;
    return error.non_field_errors || error.details;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, errors }) => (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className={`${className} shadow-sm rounded`}
          {...otherProps}
        >
          <Title />
          <Banner
            visibility={hasNonFieldError(errors)}
            type="danger"
            message={parseError(errors)}
          />
          {children}
        </form>
      )}
    </Formik>
  );
};

export default Form;
