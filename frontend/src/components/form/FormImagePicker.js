import React from "react";
import ImagePicker from "../ImagePicker";
import { useFormikContext } from "formik";
import styled from "styled-components";

const FormImagePicker = ({ name, ...otherProps }) => {
  const { errors, setFieldValue, values } = useFormikContext();
  return (
    <div className="form-group">
      <ImagePicker
        {...otherProps}
        image={values[name]}
        onChange={(file) => setFieldValue(name, file)}
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

export default FormImagePicker;
