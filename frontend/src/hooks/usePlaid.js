import plaidApiFunc from "./../api/plaid";
import { request } from "../utils";

const usePlaid = () => {
  const createLinkToken = async () => {
    // Call the api to create the link token
    const response = await request(plaidApiFunc.createLinkToken);
    // log the error of any
    if (!response.ok) return console.log(response);
    // return the created link token
    return response.data;
  };

  const setAccessToken = async (public_token) => {
    console.log(public_token);
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

  return { createLinkToken, setAccessToken, open };
};

export default usePlaid;
