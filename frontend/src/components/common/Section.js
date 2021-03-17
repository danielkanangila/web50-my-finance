import React from "react";
import Container from "./Container";

const Section = ({ className = "", children, ...restOfProps }) => {
  return (
    <section>
      <Container className={className} {...restOfProps}>
        {children}
      </Container>
    </section>
  );
};

export default Section;
