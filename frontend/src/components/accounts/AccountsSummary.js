import React from "react";
import AccountSummaryCard from "./AccountSummaryCard";
import { scaleOrdinal, schemeDark2 } from "d3";

const AccountsSummary = ({ accounts }) => {
  return (
    <div className="accounts-summary flex flex-col">
      {accounts.map((account, index) => (
        <AccountList key={index} index={index} list={account} />
      ))}
    </div>
  );
};

const AccountList = ({ list, index }) => {
  // generate accounts colors
  const color = scaleOrdinal()
    .domain(list.map((acc) => acc.account_id))
    .range(schemeDark2);
  return (
    <div className={`account-list ins-${index}`}>
      {list.map((summary) => (
        <AccountSummaryCard
          key={summary.account_id}
          {...summary}
          color={color(summary.account_id)}
        />
      ))}
    </div>
  );
};

export default AccountsSummary;
