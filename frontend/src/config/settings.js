import { isBrowser } from "../utils";

const NODE_ENV = process.env.NODE_ENV || "development";

const settings = {
  development: {
    apiURL: isBrowser()
      ? "http://localhost:8000/api"
      : "http://192.168.1.15:8000/api",
    loginURL: "/login",
    authTokenKey: "authToken", // the to retrieve the authorization token in the local storage
  },
  production: {
    apiURL: "/api",
    loginURL: "/login",
    authTokenKey: "authToken", // the to retrieve the authorization token in the local storage
  },
};

export default settings[NODE_ENV];
