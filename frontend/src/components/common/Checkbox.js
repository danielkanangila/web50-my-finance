import React from "react";

import { CheckboxWrapper } from "../styled-components";

const defaultTheme = {
  borderColor: "#ccc",
  notCheckedBg: "#fff",
  checkedBg: "#10B981",
  color: "#fff",
};

const Checkbox = ({
  label,
  value,
  onClick,
  theme = defaultTheme,
  LabelComponent,
}) => {
  return (
    <CheckboxWrapper theme={theme} onClick={() => onClick(!value)}>
      <span className={`box ${value ? "checked" : ""}`}></span>
      {value && <span className="checkmark"></span>}
      <label className="text-sm">
        {LabelComponent ? <LabelComponent /> : label}
      </label>
    </CheckboxWrapper>
  );
};

export default Checkbox;
