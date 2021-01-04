import React from "react";
import usePlaid from "../hooks/usePlaid";
import Button from "./common/Button";

const LinkBankButton = ({ className = "", ...restOfProps }) => {
  const plaid = usePlaid();
  return (
    <Button onClick={() => plaid.open()} className={className} {...restOfProps}>
      Link Bank
    </Button>
  );
};

export default LinkBankButton;
