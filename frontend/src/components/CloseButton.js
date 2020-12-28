import React from "react";
import styled from "styled-components";
import { CancelIcon } from "./icons";

const CloseButton = ({ ...rest }) => {
  return (
    <Button {...rest}>
      <CancelIcon />
    </Button>
  );
};

const Button = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 500;
  svg {
    fill: rgba(255, 255, 255, 0.8);
    width: 35px;
    height: 35px;
    transition: all 0.5s;
    &:hover {
      fill: rgba(255, 255, 255, 1);
    }
  }
`;

export default CloseButton;
