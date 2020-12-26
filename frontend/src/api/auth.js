import client from "./client";

const login = (username, password) =>
  client.post("/auth/login", { username, password });

const register = (user) => client.post("/auth/register", user);

const logout = () => client.get("/auth/logout");

export default {
  login,
  logout,
  register,
};
