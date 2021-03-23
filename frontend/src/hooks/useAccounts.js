import { useContext, useState } from "react";
import { ApplicationContext } from "../context/ApplicationContext";
// import usePlaid from "./usePlaid";
// import useErrors from "./useErrors";
// import useLoader from "./useLoader";

const useAccounts = (params) => {
  const [state] = useContext(ApplicationContext);
  const [currentAccount, setCurrentAccount] = useState({});
  const [currentColor, setCurrentColor] = useState(null);
  const [nextAccountId, setNextAccountId] = useState(null);
  const [previousAccountId, setPreviousAccountId] = useState(null);
  // const plaid = usePlaid();
  // const loader = useLoader();
  // const errors = useErrors();

  const init = (accountId, userId) => {
    setCurrentAccount(getAccountById(accountId));
    setCurrentColor(getAccountColor(accountId));
    _setNextPreviousAccount(accountId);
  };

  const _setNextPreviousAccount = (accountId) => {
    for (let i = 0; i < state.accounts.length; i++) {
      let accountList = state.accounts[i];

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
    const result = state.accountsCardColor.filter(
      (entry) => entry.accountId === accountId
    );

    if (result.length) return result[0]?.color;
    return "blue";
  };

  const getAccountById = (accountId) => {
    for (const accountList of state.accounts) {
      for (const acc of accountList) {
        if (acc.account_id === accountId) return acc;
      }
    }
  };

  return {
    accounts: state.accounts,
    currentAccount,
    currentColor,
    previousAccountId,
    nextAccountId,
    getAccountColor,
    getAccountById,
    init,
  };
};

export default useAccounts;
