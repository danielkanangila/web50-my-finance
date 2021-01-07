import client from "./client";

const createLinkToken = () => client.post("/create_link_token", {});
const setAccessToken = (data) => client.post("/set_access_token", data);
const getAccounts = (userId) => client.get(`/users/${userId}/accounts`);
const getAccountTransactions = (userId, accountId) =>
  client.get(`/users/${userId}/accounts/${accountId}/transactions`);
const getTransactions = (userId) => client.get(`/users/${userId}/transactions`);

const plaid = {
  createLinkToken,
  setAccessToken,
  getAccounts,
  getTransactions,
  getAccountTransactions,
  getTransactions,
};

export default plaid;
