import React from "react";

const Button = ({
  children,
  bg = "bg-green-500",
  hoverBg = "bg-green-600",
  className = "",
  ...restOfProps
}) => {
  return (
    <button
      {...restOfProps}
      className={`transition duration-500 ease-in-out w-full p-3 ${bg} hover:${hoverBg} rounded-md cursor-pointer text-white uppercase text-xs ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
