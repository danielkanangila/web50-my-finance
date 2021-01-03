import { isBrowser } from "../utils";

const NODE_ENV = process.env.NODE_ENV || "development";

const settings = {
  development: {
    apiURL: isBrowser()
      ? "http://localhost:8000/api"
      : "http://192.168.1.15:8000/api",
  },
  production: {
    apiURL: "/api",
  },
};

export default settings[NODE_ENV];
