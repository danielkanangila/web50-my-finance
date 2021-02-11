import React from "react";

const Button = ({
  children,
  bg = "bg-gray-900",
  hoverBg = "bg-gray-700",
  className = "",
  size = "p-3",
  width = "w-full",
  ...restOfProps
}) => {
  return (
    <button
      {...restOfProps}
      className={`transition duration-500 ease-in-out ${width} ${size} ${bg} hover:${hoverBg}  cursor-pointer text-white uppercase text-xs ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
