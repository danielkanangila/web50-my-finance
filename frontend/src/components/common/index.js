import React from "react";

export const FlexBox = ({
  className = "",
  direction = "flex-row",
  children,
  ...restOfProps
}) => (
  <div
    {...restOfProps}
    className={`flex ${direction} items-center ${className}`}
  >
    {children}
  </div>
);
