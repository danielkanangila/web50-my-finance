import React from "react";
import { useFormikContext } from "formik";

const FormField = ({ children }) => {
  const {
    errors,
    touched,
    values,
    status,
    setFieldTouched,
    setFieldValue,
  } = useFormikContext();

  return (
    <>
      {children(
        errors,
        touched,
        values,
        status,
        setFieldTouched,
        setFieldValue
      )}
    </>
  );
};

export default FormField;
