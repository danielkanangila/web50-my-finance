import { authClient } from "./client";

const createLinkToken = () => authClient().post("/create_link_token", {});
const setAccessToken = (data) => authClient().post("/set_access_token", data);
const getAccounts = (userId) => authClient().get(`/users/${userId}/accounts`);
const getAccountTransactions = (userId, accountId) =>
  authClient().get(`/users/${userId}/accounts/${accountId}/transactions`);
const getTransactions = (userId) =>
  authClient().get(`/users/${userId}/transactions`);

const plaid = {
  createLinkToken,
  setAccessToken,
  getAccounts,
  getTransactions,
  getAccountTransactions,
};

export default plaid;
