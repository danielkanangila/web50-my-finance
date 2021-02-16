import plaidApiFunc from "./../api/plaid";
import { request } from "../utils";
import { useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";
import { setAccounts, setError, setLoading } from "../context/actions";
import useLoader from "./useLoader";

const usePlaid = () => {
  const [state, dispatch] = useContext(ApplicationContext);
  const loader = useLoader();

  const createLinkToken = async () => {
    // Call the api to create the link token
    const response = await request(plaidApiFunc.createLinkToken);
    // log the error of any
    if (!response.ok) return console.log(response);
    // return the created link token
    return response.data;
  };

  const setAccessToken = async (public_token) => {
    const response = await request(plaidApiFunc.setAccessToken, {
      public_token,
    });
    // log the error of any
    if (!response.ok) return console.log(response);
    return response;
  };

  const _createHandler = async (token) => {
    // check if token is defined otherwise throw an error
    if (!token)
      throw Error("Cannot create the Plaid handler without the link token.");
    // create the Plaid handler and return it
    return window.Plaid.create({
      token,
      onSuccess: function (publicToken) {
        setAccessToken(publicToken);
      },
    });
  };

  const open = async () => {
    try {
      //create link token
      const token = await createLinkToken();
      // create the plaid link handler
      const handler = await _createHandler(token.link_token);
      // open the handler
      handler.open();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAccounts = async (userId) => {
    dispatch(setLoading(true, "Fetching your bank account(s)..."));
    const response = await request(() => plaidApiFunc.getAccounts(userId));

    if (!response.ok) {
      loader.setLoader(false);
      dispatch(
        setError(
          "An unknown error occurred while trying to retrieve your account(s) information"
        )
      );
      // console.log(response);
      return;
    }
    // Disable loading
    loader.setLoader(false);
    // Set data to the store
    dispatch(setAccounts(response.data));
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
  };
};

export default usePlaid;
