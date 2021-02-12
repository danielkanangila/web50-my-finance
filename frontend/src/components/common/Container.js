import React from "react";

const Container = ({ className = "", children, ...restOfProps }) => {
  return (
    <section
      className={`px-3 sm:px-8 lg:px-20 xl:px-80 ${className}`}
      {...restOfProps}
    >
      {children}
    </section>
  );
};

export default Container;
