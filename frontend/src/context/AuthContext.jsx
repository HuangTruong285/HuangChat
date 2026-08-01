import { createContext, useState, useEffect } from "react";
import * as authService from "../services/auth.service";
import * as userService from "../services/user.service";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const isAuthenticated = !!user;

  // Lấy thông tin user từ acces token
  const loadUser = async () => {
    setInitializing(true);
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setUser(null);
        return;
      }

      const currentUser = await userService.getMe();

      setUser(currentUser);
    } catch (error) {
      localStorage.removeItem("accessToken");
      setUser(null);
    } finally {
      setInitializing(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (loginData) => {
    setLoading(true);
    try {
      const currentUser = await authService.login(loginData);

      setUser(currentUser);

      return currentUser;
    } finally {
      setLoading(false);
    }
  };

  const register = async (registerData) => {
    setLoading(true);
    try {
      const currentUser = await authService.register(registerData);

      setUser(currentUser);

      return currentUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    initializing,
    isAuthenticated,
    login,
    register,
    logout,
    loadUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
