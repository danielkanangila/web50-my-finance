import client, { authClient } from "./client";

const login = (username, password) =>
  client().post("/auth/login", { username, password });

const register = (user) => client().post("/auth/register", user);

const logout = () => authClient().post("/auth/logout");

const auth = {
  login,
  logout,
  register,
};

export default auth;
