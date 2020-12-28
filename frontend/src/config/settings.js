const NODE_ENV = process.env.NODE_ENV || "development";

const settings = {
  development: {
    apiURL: "http://127.0.0.1:8000/api",
  },
  production: {
    apiURL: "/api",
  },
};

export default settings[NODE_ENV];
