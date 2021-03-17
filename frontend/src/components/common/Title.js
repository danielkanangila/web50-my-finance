import React from "react";

const Title = ({ title, subtitle, className }) => {
  return (
    <h1
      className={`p-3 rounded-lg text-xl font-semibold bg-white shadow ${className}`}
    >
      {title}
      {subtitle && <span className="text-sm text-gray-400">{subtitle}</span>}
    </h1>
  );
};

export default Title;
