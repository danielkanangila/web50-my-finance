import React from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import {
  getDecimalPartFromAmount,
  getWholeNumberFromAmount,
} from "../../utils";

const Amount = ({
  currency,
  amount,
  symbolSize = "md",
  numberSize = "3xl",
}) => {
  return (
    <div className="Amount flex items-start">
      <span className={`text-${symbolSize} leading-none`}>
        {getSymbolFromCurrency(currency)}
      </span>
      <span className={`text-${numberSize} leading-none -mt-1`}>
        {getWholeNumberFromAmount(amount)}
      </span>
      <span className={`text-${symbolSize} leading-none`}>
        {getDecimalPartFromAmount(amount)}
      </span>
    </div>
  );
};

export default Amount;
