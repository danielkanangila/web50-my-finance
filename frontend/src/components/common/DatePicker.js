import React from "react";
import { default as ReactDatePicker } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({ selected, label, onChange }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm" id={label.replace(" ", "")}>
        {label}
      </label>
      <ReactDatePicker selected={selected} onChange={onChange} />
    </div>
  );
};

export default DatePicker;
