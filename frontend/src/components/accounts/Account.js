import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import useAccounts from "../../hooks/useAccounts";
import Container from "../common/Container";
import { Balance } from "./AccountSummaryCard";
import Button from "./../common/Button";

const Account = () => {
  const params = useParams();
  const {
    currentAccount,
    currentColor,
    init,
    nextAccountId,
    previousAccountId,
  } = useAccounts();

  useEffect(() => {
    init(params?.accountId, params?.userId);
  }, [params, init]);

  return (
    <div>
      <Header
        {...currentAccount}
        bgColor={currentColor}
        {...currentAccount?.balances}
        nextAccountId={nextAccountId}
        previousAccountId={previousAccountId}
      />
    </div>
  );
};

export const Header = ({
  official_name,
  bgColor,
  mask,
  type,
  subtype,
  balances,
  nextAccountId,
  previousAccountId,
}) => {
  const history = useHistory();

  return (
    <div className="w-full py-8" style={{ backgroundColor: bgColor }}>
      <Container
        className="account-header flex items-center"
        largeScreen={false}
      >
        <ActionButton
          iconName="keyboard_arrow_left"
          action={() => history.push(previousAccountId)}
          disabled={!previousAccountId}
        />
        <div className="w-full flex flex-col items-center px-2 lg:px-10 2xl:px-20">
          <div className="flex items-center text-white w-full">
            <h2 className="text-md lg:text-xl text-white font-bold mr-5">
              {official_name}
            </h2>
            <p className="text-sm text-white font-medium">...{mask}</p>
          </div>
          <div className="w-full">
            <span className="text-xs text-white font-semibold uppercase">
              {type} - {subtype}
            </span>
          </div>
          <div className="w-full sm:w-3/5 mx-auto my-5  account-balances">
            <div className="flex items-center justify-between">
              <Balance
                currency_code={balances?.iso_currency_code}
                amount={balances?.current}
                balanceType="Current"
              />
              <Balance
                currency_code={balances?.iso_currency_code}
                amount={balances?.available}
                balanceType="Available"
              />
            </div>
            {balances?.limit && (
              <Balance
                currency_code={balances?.iso_currency_code}
                amount={balances?.limit}
                balanceType="Credit Line"
              />
            )}
          </div>
        </div>
        <ActionButton
          iconName="keyboard_arrow_right"
          action={() => history.push(nextAccountId)}
          disabled={!nextAccountId}
        />
      </Container>
    </div>
  );
};

export const ActionButton = ({ iconName, disabled, action }) => {
  return (
    <Button
      bg="none"
      hoverBg="bg-gray-50"
      width="w-12"
      className={`action h-12 rounded-lg ${
        disabled ? "disabled:opacity-50" : ""
      }`}
      onClick={action}
      disabled={disabled}
    >
      <span className="material-icons">{iconName}</span>
    </Button>
  );
};

export default Account;
