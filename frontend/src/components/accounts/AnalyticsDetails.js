import React from "react";
import { formatAmount, randomCardColor } from "../../utils";
import Amount from "../common/Amount";
import { DataViewer } from "../common/Table";

const AnalyticsDetails = ({
  balances = {},
  total_expenses,
  total_income,
  transactions,
}) => {
  const parseBalances = (balances) => {
    const b = [];
    for (const currency in balances) {
      const aBalance = {
        currency,
        amount: balances[currency].available,
        description: "Total Available Balance",
        color: "green-600",
      };
      const cBalance = {
        currency,
        amount: balances[currency].current,
        description: "Total Current Balance",
        color: "blue-600",
      };
      b.push(aBalance);
      b.push(cBalance);
    }
    return b;
  };

  const parseTransactions = (transactions) => {
    return transactions?.map((tx) => ({
      category: tx.category,
      amount: formatAmount(tx.amount, "USD"),
    }));
  };

  return (
    <div className="mb-5">
      <div className="analytics-details-header">
        {parseBalances(balances).map((balance, index) => (
          <Detail key={index} {...balance} />
        ))}
        <Detail
          currency="USD"
          amount={total_income}
          description="Total Income"
          color="purple-500"
        />
        <Detail
          currency="USD"
          amount={total_expenses}
          description="Total Expense"
          color="red-500"
        />
      </div>
      <div className="flex flex-col sm:flex-row-reverse justify-between items-center flex-wrap mt-5 bg-white p-8 shadow rounded-lg">
        <div className="w-full sm:w-6/12"></div>
        <div className="w-full sm:w-7/12">
          <Transactions data={parseTransactions(transactions)} />
        </div>
      </div>
    </div>
  );
};

export const Detail = ({ currency, amount, description, color }) => {
  const bgColor = color || randomCardColor();

  return (
    <div
      className={`analytics-detail bg-${bgColor} w-full rounded-md p-2 shadow-lg transition duration-500 ease-in-out hover:shadow-2xl`}
    >
      <Amount currency={currency} amount={amount} />
      <p className="text-xs uppercase">{description}</p>
    </div>
  );
};

export const Transactions = ({ data }) => {
  return (
    <>
      {data && (
        <DataViewer
          // titles={Object.keys(data[0]).filter(
          //   (key) => key === "category" || key === "amount"
          // )}
          items={data.map((tx) => ({
            ...tx,
            amount: (
              <span className="block w-full text-right">{tx.amount}</span>
            ),
          }))}
          styles={{
            td: "py-1 px-4 whitespace-normal text-sm",
            tbodyTr: "hover:bg-gray-50 transition duration-500 ease-in-out",
            tableWrapper: "overflow-hidden border-b border-t border-gray-200",
          }}
        />
      )}
    </>
  );
};

export const TransactionsChart = ({ transactions }) => {};

export default AnalyticsDetails;
