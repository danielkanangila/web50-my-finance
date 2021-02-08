import React from "react";

const Container = ({ className = "", children, ...restOfProps }) => {
  return (
    <div
      className={`pl-3 pr-3 sm:pl-8 sm:pr-8 lg:pl-20 lg:pr-20 ${className}`}
      {...restOfProps}
    >
      {children}
    </div>
  );
};

export default Container;
