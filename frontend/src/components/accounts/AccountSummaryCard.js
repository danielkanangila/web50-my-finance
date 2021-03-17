import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApplicationContext } from "../../context/ApplicationContext";
import { setAccountCardStyle } from "../../context/actions";
import Amount from "../common/Amount";

const AccountSummaryCard = ({
  account_id,
  official_name,
  mask,
  subtype,
  balances,
  color,
}) => {
  const dispatch = useContext(ApplicationContext)[1];
  const [hover, setHover] = useState(false);

  useEffect(() => {
    dispatch(setAccountCardStyle(account_id, color));
    return () => {};
  }, []); // eslint-disable-line

  return (
    <Link
      to={`/accounts/${account_id}`}
      className={`act-summary-card bg-white rounded-lg p-5 shadow-lg hover:bg-${color} transition duration-500 ease-in-out border-t-4`}
      style={{
        borderColor: color,
        ...(hover && { backgroundColor: color }),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="card-header">
        <div className="flex items-center">
          <h2 className="text-sm font-bold mr-5">{official_name}</h2>
          <p className="text-xs text-gray-500 font-medium">...{mask}</p>
        </div>
        <span className="text-xs text-gray-500 font-semibold uppercase">
          {subtype}
        </span>
      </div>
      <Balances {...balances} />
    </Link>
  );
};

export const Balances = ({ available, current, iso_currency_code, limit }) => {
  return (
    <div className="balances">
      <Balance
        currency_code={iso_currency_code}
        amount={current}
        balanceType={"Current"}
      />
      <div className="flex justify-between">
        <Balance
          currency_code={iso_currency_code}
          amount={available}
          balanceType={"Available"}
        />
        {limit && (
          <Balance
            currency_code={iso_currency_code}
            amount={limit}
            balanceType={"Credit Line"}
          />
        )}
      </div>
    </div>
  );
};

export const Balance = ({ currency_code, amount, balanceType, className }) => (
  <div className={`balance-card ${className} my-5`}>
    <Amount currency={currency_code} amount={amount} />
    <span className="balance-type text-xs uppercase">{balanceType}</span>
  </div>
);

export default AccountSummaryCard;
