import settings from "./../config/settings";

export const getAuthToken = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr).token : "";
};

const initializeClient = ({ authToken, baseURL }) => {
  if (!authToken)
    return axios.create({
      baseURL: baseURL,
    });
  return axios.create({
    baseURL,
    headers: {
      Authorization: `Token ${authToken}`,
    },
  });
};

export default initializeClient({
  authToken: getAuthToken(),
  baseURL: settings.apiURL,
});
