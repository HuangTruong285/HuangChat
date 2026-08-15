import { createContext, useState, useEffect } from "react";

import * as authService from "../services/auth.service";
import * as userService from "../services/user.service";

import { getAccessToken, removeAccessToken } from "../utils/token";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const isAuthenticated = !!user;

  // Hàm lấy thông tin user
  const loadUser = async () => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        setUser(null);
        return;
      }

      const currentUser = await userService.getMe();
      setUser(currentUser);
    } catch (error) {
      removeAccessToken();
      setUser(null);
    }
  };

  // Mỗi lần reload là chạy loadUser một lần
  useEffect(() => {
    const initialize = async () => {
      setInitializing(true);
      await loadUser();
      setInitializing(false);
    };

    initialize();
  }, []);

  // ============================== REGISTER ==============================
  const register = async (registerData) => {
    setLoading(true);
    try {
      await authService.register(registerData);
      const currentUser = await userService.getMe();
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ============================== LOGIN ==============================
  const login = async (loginData) => {
    setLoading(true);
    try {
      await authService.login(loginData);
      const currentUser = await userService.getMe();
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
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
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
