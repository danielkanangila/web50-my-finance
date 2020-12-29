import client from "./client";

const createLinkToken = () => client.post("/create_link_token", {});
const setAccessToken = (data) => client.post("/set_access_token", data);

const plaid = {
  createLinkToken,
  setAccessToken,
};

export default plaid;
