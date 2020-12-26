import { useLocalStorage } from "./useLocalStorage";

const useAuth = () => {
  const [user, setUser] = useLocalStorage("user", null);

  const login = (user) => setUser(user);

  const logout = () => localStorage.removeItem("user");

  const refresh = (freshUser) => {
    setUser({
      ...user,
      user: freshUser,
    });
  };

  return { ...user, login, logout, refresh };
};

export default useAuth;
