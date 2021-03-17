import React from "react";
import AccountSummaryCard from "./AccountSummaryCard";

const AccountsSummary = ({ accounts }) => {
  return (
    <div className="accounts-summary flex flex-col">
      {accounts.map((account, index) => (
        <AccountList key={index} index={index} list={account} />
      ))}
    </div>
    // <div className="account-list">
    //   {accounts.map((act, index) => (
    //     <>
    //         {act.map(summary => <AccountSummaryCard key={index} {...act.accounts} />)}
    //     </>
    //   ))}
    // </div>
  );
};

const AccountList = ({ list, index }) => (
  <div className={`account-list ins-${index}`}>
    {list.map((summary) => (
      <AccountSummaryCard key={summary.account_id} {...summary} />
    ))}
  </div>
);

export default AccountsSummary;
