import React, { useState } from "react";

const MouseHover = ({ children, ...rest }) => {
  const [hover, setHover] = useState(false);

  const handleMouseHover = (status) => {
    setHover(status);
  };

  return (
    <div
      onMouseEnter={() => handleMouseHover(true)}
      onMouseLeave={() => handleMouseHover(false)}
      {...rest}
    >
      {children(hover)}
    </div>
  );
};

export default MouseHover;
