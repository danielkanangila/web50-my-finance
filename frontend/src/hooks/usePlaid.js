import plaidApiFunc from "./../api/plaid";
import { request } from "../utils";
import { useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";
import { setAccounts, setAnalytics, setLoading } from "../context/actions";
import useLoader from "./useLoader";
import useErrors from "./useErrors";

const usePlaid = () => {
  const [state, dispatch] = useContext(ApplicationContext);
  const loader = useLoader();
  const errors = useErrors();

  const createLinkToken = async () => {
    // Call the api to create the link token
    const response = await request(plaidApiFunc.createLinkToken);
    // log the error of any
    if (!response.ok) return console.log(response);
    // return the created link token
    return response.data;
  };

  const setAccessToken = async (public_token, auth) => {
    const response = await request(plaidApiFunc.setAccessToken, {
      public_token,
    });
    // log the error of any
    if (!response.ok) {
      errors.setErrors(
        "An error occurred while trying to link your Account. Please make sure that you're not linked an existing institution and try again."
      );
      return console.log(response);
    }
    // if request success, remove error
    errors.setErrors();
    // reload windows to fetch user account(s) info
    window.location.reload();
    // console.log(auth);
    // fetchAccounts(auth?.user?.id);
    // return response;
  };

  const _createHandler = async (token, auth) => {
    // check if token is defined otherwise throw an error
    if (!token)
      throw Error("Cannot create the Plaid handler without the link token.");
    // create the Plaid handler and return it
    return window.Plaid.create({
      token,
      onSuccess: function (publicToken) {
        setAccessToken(publicToken, auth);
      },
    });
  };

  const open = async (auth) => {
    try {
      //create link token
      const token = await createLinkToken();
      // create the plaid link handler
      const handler = await _createHandler(token.link_token, auth);
      // open the handler
      handler.open();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAccounts = async (userId) => {
    return await _fetch({
      apiFunc: () => plaidApiFunc.getAccounts(userId),
      successCallback: (data) => dispatch(setAccounts(data)),
      loadingMessage: "Fetching your bank account(s)...",
      errorMessage:
        "An unknown error occurred while trying to retrieve your account(s) information.",
    });
  };

  const fetchAnalytics = async (userId) => {
    return await _fetch({
      apiFunc: () => plaidApiFunc.getAnalytics(userId),
      successCallback: (data) => dispatch(setAnalytics(data)),
      loadingMessage: "Analyzing your bank account(s) information...",
      errorMessage:
        "An unknown error occurred while trying to analyze your account(s) information.",
    });
  };

  const getLinkedBanks = async () => {
    return await _fetch({
      apiFunc: () => plaidApiFunc.getLinkedBanks(),
      successCallback: (data) => console.log(data),
      loadingMessage: 'Retrieving your account information...',
      errorMessage: 'An unknown error occurred while trying to retrieve your account information.'
    })
  }

  const fetchAnalyticsWithQuery = async (userId, query) => {
    return await _fetch({
      apiFunc: () => plaidApiFunc.getAnalyticsWithQuery(userId, query),
      successCallback: async (data) => await updateAnalytics(data),
      loadingMessage: "Analyzing your bank account(s) information...",
      errorMessage:
        "An unknown error occurred while trying to analyze your account(s) information.",
    });
  };

  const updateAnalytics = async (newData) => {
    await dispatch(setAnalytics({}));
    await dispatch(setAnalytics(newData));
  };

  const _fetch = async ({
    apiFunc,
    successCallback,
    loadingMessage,
    errorMessage,
  }) => {
    dispatch(setLoading(true, loadingMessage));
    const response = await request(apiFunc);

    if (!response.ok) {
      loader.setLoader(false);
      errors.setErrors(errorMessage);
      return;
    }
    // Disable loading
    loader.setLoader(false);
    // Set data to the store
    return successCallback(response.data);
  };

  const formatChartData = (transactions, color) => {
    const totalTransactionsValue = transactions.reduce((total, tx) => {
      return total + Math.round(tx.amount);
    }, 0);

    const formatted = transactions.map((tx) => {
      const value = Math.round(
        ((tx.amount / totalTransactionsValue) * 100).toFixed(2)
      );

      return {
        color: color(tx.category),
        name: tx.category,
        value: value || 1,
      };
    });

    return [formatted, totalTransactionsValue];
  };

  const computeTransactionsValue = (transactions) => {
    return transactions.reduce((total, tx) => {
      return total + Math.round(tx.amount);
    }, 0);
  };

  const computePercentage = (total, amount, toFixed = 2) => {
    return ((amount / total) * 100).toFixed(toFixed);
  };

  return {
    state: {
      transactions: state.transactions,
      analytics: state.analytics,
      accounts: state.accounts,
    },
    createLinkToken,
    setAccessToken,
    open,
    fetchAccounts,
    fetchAnalytics,
    formatChartData,
    computeTransactionsValue,
    computePercentage,
    fetchAnalyticsWithQuery,
    getLinkedBanks
  };
};

export default usePlaid;
