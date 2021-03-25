import { authClient } from "./client";

const createLinkToken = () => authClient().post("/create_link_token", {});
const setAccessToken = (data) => authClient().post("/access_tokens", data);
const getLinkedBanks = () => authClient().get("/access_tokens");
const unlinkBank = (access_token_id) => authClient().delete(`/access_tokens/${access_token_id}`);
const getAccounts = (userId) => authClient().get(`/users/${userId}/accounts`);
const getAccountTransactions = (userId, accountId) =>
  authClient().get(`/users/${userId}/accounts/${accountId}/transactions`);
const getTransactions = (userId) =>
  authClient().get(`/users/${userId}/transactions`);

const getAnalytics = (userId) => authClient().get(`/users/${userId}/analytics`);

const getAnalyticsWithQuery = (userId, query) =>
  authClient().get(`/users/${userId}/analytics?${query}`);

const plaid = {
  createLinkToken,
  setAccessToken,
  getAccounts,
  getTransactions,
  getAccountTransactions,
  getAnalytics,
  getAnalyticsWithQuery,
  getLinkedBanks,
  unlinkBank
};

export default plaid;
