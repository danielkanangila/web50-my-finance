import axios from "axios";
import settings from "./../config/settings";

export const getAuthToken = () => {
  const userStr = localStorage.getItem("authToken");
  return userStr ? JSON.parse(userStr).token : "";
};

const defaultClient = () => {
  return axios.create({
    baseURL: settings.apiURL,
  });
};

export const authClient = () => {
  return axios.create({
    baseURL: settings.apiURL,
    headers: {
      Authorization: `Token ${getAuthToken()}`,
    },
  });
};

export default defaultClient;
