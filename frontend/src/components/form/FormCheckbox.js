import React from "react";
import { useFormikContext } from "formik";
import styled from "styled-components";

import Checkbox from "../Checkbox";

const FormCheckbox = ({ label, name, LabelComponent, theme }) => {
  const { values, setFieldValue, errors } = useFormikContext();
  return (
    <div className="form-group">
      <Checkbox
        label={label}
        theme={theme}
        value={values[name]}
        onClick={(value) => setFieldValue(name, value)}
        LabelComponent={LabelComponent}
      />
      {errors[name] && <Error>{errors[name]}</Error>}
    </div>
  );
};

const Error = styled.div`
  padding: 10px;
  font-size: 0.85rem;
  color: red;
`;

export default FormCheckbox;
