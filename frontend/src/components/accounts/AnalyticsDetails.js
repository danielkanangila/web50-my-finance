import React from "react";
import { scaleOrdinal, quantize, interpolateSpectral } from "d3";
import { formatAmount, randomCardColor } from "../../utils";
import Amount from "../common/Amount";
import { DataViewer } from "../common/Table";
import usePlaid from "./../../hooks/usePlaid";
import { TransactionAmount, Color, Percentage } from "./others";
import PieChart from "./../common/PieChart";

const AnalyticsDetails = ({
  balances = {},
  total_expenses,
  total_income,
  transactions = [],
}) => {
  const { computeTransactionsValue } = usePlaid();
  // generate colors to use in the chart, legend, and transactions table
  const color = scaleOrdinal()
    .domain(transactions?.map((tx) => tx.category))
    .range(
      quantize((t) => interpolateSpectral(t * 0.8 + 0.1), transactions?.length)
    );
  // format transactions for pie chart
  const chartData = transactions?.map((tx) => ({
    name: tx.category,
    value: tx.amount,
    color: color(tx.category),
  }));
  // calculate the total transactions value
  const totalTransactions = computeTransactionsValue(transactions);

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
    return transactions?.map((tx, index) => ({
      color: <Color key={index} color={color(tx.category)} />,
      category: tx.category,
      amount: (
        <TransactionAmount
          key={index}
          amount={formatAmount(tx.amount, "USD")}
        />
      ),
      percentage: (
        <Percentage
          key={index}
          totalValue={totalTransactions}
          itemValue={tx.amount}
        />
      ),
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
      <div className="flex flex-col lg:flex-row  justify-between items-center flex-wrap mt-5 bg-white p-8 shadow rounded-lg">
        <div className="w-full mb-5 lg:mb-0 lg:w-5/12 h-full">
          <PieChart data={chartData} />
        </div>
        <div className="w-full lg:w-7/12">
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
          items={data}
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

// export const TransactionsChart = ({ transactions }) => {
//   return (
//     // <PieChart />
//   );
// };

export default AnalyticsDetails;
