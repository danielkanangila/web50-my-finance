import React from "react";
import { formatAmount } from "../../utils";
import Container from "../common/Container";
import { DataViewer } from "./../common/Table";
import { TransactionAmount } from "./others";

const Transactions = ({ transactions }) => {
  const formatItems = (items = []) => {
    return items.map((tx, index) => ({
      ...tx,
      amount: (
        <TransactionAmount
          key={index}
          amount={formatAmount(tx.amount, "USD")}
        />
      ),
      category: (
        <ItemDescription
          key={index}
          category={tx.category}
          description={tx.description}
        />
      ),
    }));
  };
  return (
    <Container>
      <h2 className="text-2xl font-bold mb-5">Transactions</h2>
      <div>
        <DataViewer
          keys={["date", "category", "amount"]}
          items={[]}
          showHeader={true}
          styles={{
            td: "py-1 px-4 whitespace-normal text-sm",
            tbodyTr: "hover:bg-gray-50 transition duration-500 ease-in-out",
            tableWrapper: "overflow-hidden border-b border-t border-gray-200",
          }}
        />
        <GroupHeader
          name="Incomes"
          total={formatAmount(transactions?.incomes?.total, "USD")}
        />
        <DataViewer
          keys={["date", "category", "amount"]}
          items={formatItems(transactions?.incomes?.items)}
          styles={{
            td: "py-1 px-4 whitespace-normal text-sm",
            tbodyTr: "hover:bg-gray-50 transition duration-500 ease-in-out",
            tableWrapper: "overflow-hidden border-b border-t border-gray-200",
          }}
        />
        <GroupHeader
          name="Expenses"
          total={formatAmount(transactions?.expenses?.total, "USD")}
        />
        <DataViewer
          keys={["date", "category", "amount"]}
          items={formatItems(transactions?.expenses?.items)}
          styles={{
            td: "py-1 px-4 whitespace-normal text-sm",
            tbodyTr: "hover:bg-gray-50 transition duration-500 ease-in-out",
            tableWrapper: "overflow-hidden border-b border-t border-gray-200",
          }}
        />
      </div>
    </Container>
  );
};

export const GroupHeader = ({ name, total }) => (
  <div className="py-3 px-6 bg-gray-300 font-bold text-xs uppercase flex justify-between">
    <h3 className="">{name}</h3>
    <span>{total}</span>
  </div>
);

export const ItemDescription = ({ category, description }) => {
  return (
    <div className="flex flex-col">
      <span className="font-semibold">{description}</span>
      <span className="text-xs text-gray-400">{category}</span>
    </div>
  );
};

export default Transactions;
