import React, { useEffect, useState } from "react";
import { format, sub } from "date-fns";
import DatePicker from "./../common/DatePicker";
import { formatAmount } from "../../utils";
import Container from "../common/Container";
import { DataViewer } from "./../common/Table";
import { TransactionAmount } from "./others";
import Button from "../common/Button";
import usePlaid from "../../hooks/usePlaid";
import useAuth from "../../hooks/useAuth";
import useAccounts from "../../hooks/useAccounts";
import Loader from "../common/Loader";

const Transactions = ({ transactions, accountId }) => {
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const plaid = usePlaid();
  const { groupTransactionsByType } = useAccounts();

  useEffect(() => {
    // set default values
    setCurrentTransactions(transactions);
    setEndDate(new Date());
    setStartDate(
      new Date(sub(new Date(endDate), { years: 0, months: 1, days: 0 }))
    );
  }, [transactions]); // eslint-disable-line

  const updateTransactions = async () => {
    setLoading(true);
    await plaid.fetchAnalyticsWithQuery(
      auth?.user?.id,
      `start_date=${format(startDate, "yyyy-MM-dd")}&end_date=${format(
        endDate,
        "yyyy-MM-dd"
      )}`
    );
    const newTxs = groupTransactionsByType(accountId);
    setCurrentTransactions(newTxs);
    setLoading(false);
  };

  return (
    <Container>
      <Header
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        updateTransactions={updateTransactions}
      />
      <Loader visibility={loading} message="Loading Transactions..." />
      {!loading && (
        <TransactionsList currentTransactions={currentTransactions} />
      )}
    </Container>
  );
};

export const Header = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  updateTransactions,
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-5">Transactions</h2>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center">
        <div className="flex flex-col sm:flex-row">
          <div>
            <DatePicker
              label="Start Date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="my-2 sm:mx-5"></div>
          <DatePicker
            label="End Date"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
        <div className="flex flex-col sm:ml-10 mt-5 justify-end bg-green-500">
          <Button onClick={updateTransactions}>Submit</Button>
        </div>
      </div>
    </>
  );
};

export const TransactionsList = ({ currentTransactions }) => {
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
        total={formatAmount(currentTransactions?.incomes?.total, "USD")}
      />
      <DataViewer
        keys={["date", "category", "amount"]}
        items={formatItems(currentTransactions?.incomes?.items)}
        styles={{
          td: "py-1 px-4 whitespace-normal text-sm",
          tbodyTr: "hover:bg-gray-50 transition duration-500 ease-in-out",
          tableWrapper: "overflow-hidden border-b border-t border-gray-200",
        }}
      />
      <GroupHeader
        name="Expenses"
        total={formatAmount(currentTransactions?.expenses?.total, "USD")}
      />
      <DataViewer
        keys={["date", "category", "amount"]}
        items={formatItems(currentTransactions?.expenses?.items)}
        styles={{
          td: "py-1 px-4 whitespace-normal text-sm",
          tbodyTr: "hover:bg-gray-50 transition duration-500 ease-in-out",
          tableWrapper: "overflow-hidden border-b border-t border-gray-200",
        }}
      />
    </div>
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
