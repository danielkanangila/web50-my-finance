export const SET_AUTH_USER = "SET_AUTH_USER";
export const DELETE_AUTH_USER = "SET_AUTH_USER";
export const SET_ACCOUNTS = "SET_ACCOUNTS";
export const SET_ANALYTICS = "SET_ANALYTICS";
export const SET_TRANSACTIONS = "SET_TRANSACTIONS";
export const SET_ERROR = "SET_ERROR";
export const SET_LOADING = "SET_LOADING";
export const SET_ACCOUNT_CARD_STYLE = "SET_ACCOUNT_STYLE";

export const setAuth = (user) => ({ type: SET_AUTH_USER, payload: user });
export const deleteAuth = () => ({ type: DELETE_AUTH_USER });

export const setAccounts = (data) => {
  const accounts = data.map((dt) => dt.accounts);
  return { type: SET_ACCOUNTS, payload: accounts };
};

export const setAnalytics = (data) => ({ type: SET_ANALYTICS, payload: data });
export const setTransactions = (data) => ({
  type: SET_TRANSACTIONS,
  payload: data,
});

export const setError = (message) => ({ type: SET_ERROR, payload: message });
export const setLoading = (status, message = "") => ({
  type: SET_LOADING,
  payload: {
    message,
    status,
  },
});

export const setAccountCardStyle = (accountId, cardColor) => ({
  type: SET_ACCOUNT_CARD_STYLE,
  payload: { accountId, cardColor },
});
