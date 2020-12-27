import React from "react";
import styled from "styled-components";

const defaultTheme = {
  borderColor: "#ccc",
  notCheckedBg: "#fff",
  checkedBg: "#10B981",
  color: "#fff",
};

const Checkbox = ({ label, value, onClick, theme = defaultTheme }) => {
  return (
    <Wrapper theme={theme} onClick={() => onClick(!value)}>
      <span className={`box ${value ? "checked" : ""}`}></span>
      {value && <span className="checkmark"></span>}
      <label className="text-sm">{label}</label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: fit-content;
  position: relative;
  .box {
    display: block;
    position: absolute;
    width: 25px;
    height: 25px;
    transition: 0.3s;
    cursor: pointer;
    ${({ theme }) =>
      `border: solid 2px ${theme.borderColor}; border-radius: 4px;background-color: ${theme.notCheckedBg};color: ${theme.color};`};
    &:hover,
    &.checked {
      ${({ theme }) =>
        `background-color: ${theme.checkedBg}; border-color: ${theme.checkedBg};`};
    }
  }
  .checkmark {
    position: absolute;
    left: 10px;
    top: 4.5px;
    width: 5px;
    height: 10px;
    ${({ theme }) => `border solid ${theme.color}`};
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  label {
    margin: 0;
    padding: 0;
    margin-left: 35px;
  }
`;

export default Checkbox;
