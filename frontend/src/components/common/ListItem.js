import React from "react";

const ListItem = ({
  className = "",
  bg = "bg-white",
  hoverBg = "bg-gray-100",
  children,
  ...restOfProps
}) => {
  return (
    <div
      {...restOfProps}
      className={`transition duration-500 ease-in-out p-3 flex items-center justify-between ${bg} hover:${hoverBg} ${className}`}
    >
      {children}
    </div>
  );
};

export default ListItem;
