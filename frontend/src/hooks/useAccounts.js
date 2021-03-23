import { useContext, useState } from "react";
import { ApplicationContext } from "../context/ApplicationContext";
import usePlaid from "./usePlaid";
// import useErrors from "./useErrors";
// import useLoader from "./useLoader";

const useAccounts = (params) => {
  const [appState] = useContext(ApplicationContext);
  const [currentAccount, setCurrentAccount] = useState({});
  const [currentColor, setCurrentColor] = useState(null);
  const [nextAccountId, setNextAccountId] = useState(null);
  const [previousAccountId, setPreviousAccountId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const { computeTransactionsValue } = usePlaid();
  // const plaid = usePlaid();
  // const loader = useLoader();
  // const errors = useErrors();

  const init = (accountId, userId) => {
    setCurrentAccount(getAccountById(accountId));
    setCurrentColor(getAccountColor(accountId));
    _setNextPreviousAccount(accountId);
    _setTransactions(accountId);
  };

  const groupTransactionType = (accountId, data) => {
    const items = extractAccountTransaction(accountId, data);
    const expenses = items.filter((tx) => tx.transaction_type === "Expense");
    const incomes = items.filter((tx) => tx.transaction_type === "Income");

    return {
      expenses: {
        total: computeTransactionsValue(expenses),
        items: expenses,
      },
      incomes: {
        total: computeTransactionsValue(incomes),
        items: incomes,
      },
    };
  };

  const extractAccountTransaction = (accountId, data = null) => {
    // extract transactions list from analytics
    const items = data || appState?.analytics?.transactions;
    let _transactions = [];
    for (const item of items) {
      if (item.transactions) {
        // get all transactions related to the accountId
        const filteredTx = item.transactions.filter(
          (tx) => tx.account_id === accountId
        );
        if (filteredTx.length)
          _transactions = [..._transactions, ...filteredTx];
      }
    }
    return _transactions;
  };

  const _setTransactions = (accountId) =>
    setTransactions(groupTransactionType(accountId));

  const _setNextPreviousAccount = (accountId) => {
    for (let i = 0; i < appState.accounts.length; i++) {
      let accountList = appState.accounts[i];

      for (let y = 0; y < accountList.length; y++) {
        if (accountList[y].account_id === accountId) {
          // set previousAccount id
          if (y > 0) setPreviousAccountId(accountList[y - 1].account_id);
          // set nextAccount id
          // return null if the current index is equal to the length of the accountList

          if (y + 1 === accountList.length) return;
          // otherwise set the nextAccount id to the index (y +1)
          if (y < accountList.length)
            setNextAccountId(accountList[y + 1].account_id);
        }
      }
    }
  };

  const getAccountColor = (accountId) => {
    const result = appState.accountsCardColor.filter(
      (entry) => entry.accountId === accountId
    );

    if (result.length) return result[0]?.color;
    return "blue";
  };

  const getAccountById = (accountId) => {
    for (const accountList of appState.accounts) {
      for (const acc of accountList) {
        if (acc.account_id === accountId) return acc;
      }
    }
  };

  return {
    accounts: appState.accounts,
    currentAccount,
    currentColor,
    previousAccountId,
    nextAccountId,
    transactions,
    getAccountColor,
    getAccountById,
    groupTransactionType,
    init,
  };
};

export default useAccounts;
