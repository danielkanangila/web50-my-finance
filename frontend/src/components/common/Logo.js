import React from "react";
import styled from "styled-components";

const Logo = ({ size = "text-2xl" }) => (
  <H1 className={`font-extrabold ${size} text-black`}>MyFinance</H1>
);

const H1 = styled.h1`
  font-family: "Pacifico", cursive;
`;

export default Logo;
