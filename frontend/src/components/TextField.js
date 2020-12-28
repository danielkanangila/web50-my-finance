import React, { useState, useEffect } from "react";

import { ReactComponent as VisibilityIcon } from "../assets/visibility.svg";
import { ReactComponent as VisibilityOffIcon } from "../assets/visibility_off.svg";
import { Error, TextFieldWrapper } from "./styled-components";

const defaultStyles = {
  borderSize: 2,
  borderColor: "#ddd",
  borderRadius: 5,
  borderBottom: false,
  focusedLabelTopPosition: 7,
  colorPrimary: "#10B981",
  colorDefault: "#757575",
  labelFocusedColor: "#000",
  errorColor: "#e04040",
};

const TextField = ({
  type,
  label,
  onChange,
  onFocus,
  onBlur,
  _style,
  name,
  error,
  touched,
  ...rest
}) => {
  const [inputType, setInputType] = useState(type);
  const [pwdVisibility, setPwdVisibility] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setInputType(type);
  }, [type]);

  // Track touched and error
  useEffect(() => {
    if (error && touched) setHasError(true);
    else setHasError(false);
  }, [error, touched]);

  const changePasswordVisibility = (visibility) => {
    setPwdVisibility(visibility);
    if (visibility) setInputType("text");
    else setInputType("password");
  };

  const handleChange = (e) => {
    if (onChange) onChange(e);
    if (e.target.value) setIsEmpty(false);
    else setIsEmpty(true);
  };

  const handleFocus = (e) => {
    if (onFocus) onFocus(e);
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    if (onBlur) onBlur(e);
    setIsFocused(false);
  };

  const getStyles = () => {
    if (_style)
      return {
        ...defaultStyles,
        ..._style,
      };
    return defaultStyles;
  };

  return (
    <TextFieldWrapper isEmpty={isEmpty} focus={isFocused} _style={getStyles()}>
      <label className={hasError ? "field-label error " : "field-label"}>
        {label}
      </label>
      <FieldWidget
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type={inputType}
        className={hasError ? "field error " : "field"}
        {...rest}
      />
      {type === "password" && (
        <span
          className="pwd-visibility"
          onClick={() => changePasswordVisibility(!pwdVisibility)}
        >
          {pwdVisibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </span>
      )}
      {hasError && <Error styles={defaultStyles}>{error}</Error>}
    </TextFieldWrapper>
  );
};

const FieldWidget = ({ type, ...rest }) => {
  if (type === "long-text") return <textarea {...rest}></textarea>;
  else return <input type={type} {...rest} />;
};

export default TextField;
