import React from "react";
import FormField from "./FormField";
import TextField from "./../TextField";

const FormTextField = ({ type, label, name, ...rest }) => {
  return (
    <FormField>
      {(errors, touched, values, status, setFieldTouched, setFieldValue) => (
        <TextField
          type={type}
          name={name}
          label={label}
          onChange={(e) => setFieldValue(name, e.target.value)}
          onBlur={() => setFieldTouched(name)}
          error={errors[name] || null}
          value={values[name]}
          touched={touched[name] || null}
          //   status={status[name] || null}
          {...rest}
        />
      )}
    </FormField>
  );
};

export default FormTextField;
