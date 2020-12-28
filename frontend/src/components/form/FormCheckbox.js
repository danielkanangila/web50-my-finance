import React from "react";
import { useFormikContext } from "formik";

import Checkbox from "../Checkbox";
import { Error } from "../styled-components";

const FormCheckbox = ({ label, name, LabelComponent, theme }) => {
  const {
    values,
    setFieldValue,
    errors,
    touched,
    setFieldTouched,
  } = useFormikContext();
  return (
    <div className="form-group">
      <Checkbox
        label={label}
        theme={theme}
        value={values[name]}
        onClick={(value) => {
          setFieldValue(name, value);
          setFieldTouched(name);
        }}
        LabelComponent={LabelComponent}
      />
      {errors[name] && touched[name] && <Error>{errors[name]}</Error>}
    </div>
  );
};

export default FormCheckbox;
