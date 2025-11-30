import { createContext, useContext, useEffect, useState } from "react";
import { fetchMe } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);  // username + role
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // const { data } = await fetchMe();
      // setUser(data);

      const { data } = await fetchMe();
setUser({
  ...data,
  role: data.role?.toUpperCase()
});

    } catch {
      localStorage.removeItem("accessToken");
    } finally {
      setLoading(false);
    }
  };

  const login = (token, user) => {
    localStorage.setItem("accessToken", token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
