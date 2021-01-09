import client, { authClient } from "./client";

const login = (username, password) =>
  client().post("/auth/login", { username, password });

const register = (user) => client().post("/auth/register", user);

const logout = () => authClient().post("/auth/logout");

const getUser = () => authClient().get("/auth/user");

const auth = {
  getUser,
  login,
  logout,
  register,
};

export default auth;
