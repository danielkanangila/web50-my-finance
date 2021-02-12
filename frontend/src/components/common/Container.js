import React from "react";

const Container = ({ className = "", children, ...restOfProps }) => {
  return (
    <div
      className={`px-4 sm:px-8 lg:px-20 xl:px-80 ${className}`}
      {...restOfProps}
    >
      {children}
    </div>
  );
};

export default Container;
