import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { ReactComponent as VisibilityIcon } from "../assets/visibility.svg";
import { ReactComponent as VisibilityOffIcon } from "../assets/visibility_off.svg";

const css = String.raw;

const defaultStyles = {
  borderSize: 2,
  borderColor: "#ddd",
  borderRadius: 5,
  borderBottom: false,
  focusedLabelTopPosition: 7,
  colorPrimary: "#2979ff",
  colorDefault: "#757575",
  labelFocusedColor: "#000",
  errorColor: "#B71C1C",
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
      {hasError && <Error>{error}</Error>}
    </TextFieldWrapper>
  );
};

const FieldWidget = ({ type, ...rest }) => {
  if (type === "long-text") return <textarea {...rest}></textarea>;
  else return <input type={type} {...rest} />;
};

const Error = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 0.8rem;
  color: ${defaultStyles.errorColor};
  transition: all 0.3s ease;
  text-align: left;
  display: flex;
  flex-direction: column;
  i {
    position: relative;
    display: flex;
    align-items: center;
    &::before {
      display: block;
      content: "";
      width: 5px;
      height: 5px;
      border-radius: 50%;
      margin-right: 10px;
      background-color: ${defaultStyles.errorColor};
    }
  }
`;

const TextFieldWrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  position: relative;

  input,
  textarea {
    outline: none;
    border: none;
    -webkit-appearance: none;
    appearance: none;
    font-size: 100%;
    transition: all 0.3s ease;
    /** Setting border & padding based on _style props **/
    ${(props) =>
      props._style &&
      css`
        ${props._style.borderBottom
          ? css`
              border-bottom: ${props._style.borderSize}px solid
                ${props._style.borderColor};
              padding: 15px 15px 15px 0px;
            `
          : css`
              border: ${props._style.borderSize}px solid
                ${props._style.borderColor};
              border-radius: ${props._style.borderRadius}px;
              padding: 15px;
            `}
        &:focus {
          border-color: ${props._style.colorPrimary};
          outline: 0;
        }
        &.error {
          border-color: ${props._style.errorColor};
          color: ${props._style.errorColor};
        }
      `}

    ${(props) =>
      (!props.isEmpty || props.focus) &&
      css`
        ${props._style.borderBottom
          ? css`
              padding: 22px 15px 8px 0px;
            `
          : css`
              padding: 22px 15px 8px 15px;
            `}
      `}
    &[type="password"] {
      padding-right: 40px;
    }
  }

  label {
    position: absolute;
    transition: all 0.3s ease;
    /** Setting left position and color **/
    ${(props) =>
      props._style &&
      css`
        color: ${props._style.colorDefault};
        ${props._style.borderBottom
          ? css`
              left: 0;
            `
          : css`
              left: 15px;
            `}
        &.error {
          color: ${props._style.errorColor};
        }
      `}
    /** Others **/
    ${(props) =>
      props.isEmpty &&
      css`
        top: 17px;
        font-size: 100%;
      `}
    ${(props) =>
      (!props.isEmpty || props.focus) &&
      css`
        top: ${props._style.focusedLabelTopPosition}px;
        font-size: 0.7rem;
        font-weight: bold;
        color: ${props._style.colorPrimary};
      `}
    ${(props) =>
      !props.focus &&
      !props.isEmpty &&
      css`
        color: ${props._style.labelFocusedColor};
      `}
  }

  input:focus::-webkit-input-placeholder {
    opacity: 1;
  }

  .pwd-visibility {
    position: absolute;
    top: 17px;
    right: 15px;
    cursor: pointer;

    svg {
      transition: all 0.3s ease;
    }

    &:hover svg {
      ${(props) =>
        props._style &&
        css`
          fill: ${props._style.colorPrimary};
        `}
    }
  }
`;

export default TextField;
