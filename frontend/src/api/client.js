import axios from "axios";
import { isUpcomingDate } from "../utils";
import settings from "./../config/settings";

export const getAuthToken = () => {
  try {
    const authToken = JSON.parse(localStorage.getItem(settings.authTokenKey));
    return authToken && isUpcomingDate(authToken.expiry)
      ? authToken.token
      : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const defaultClient = () => {
  return axios.create({
    baseURL: settings.apiURL,
  });
};

/**
 * Create axios instance and set to the request header the Authorization Token if exists and valid (not expired).
 * Otherwise delete the expired Authorization Token and redirect user to login page
 */
export const authClient = () => {
  const token = getAuthToken();

  // if token is null delete the token in the local storage and redirect to login
  if (!token) {
    localStorage.removeItem(settings.authTokenKey);
    window.location = settings.loginURL;
    return;
  }

  return axios.create({
    baseURL: settings.apiURL,
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export default defaultClient;
