import { createContext, useState, useEffect } from "react";
import * as authService from "../services/auth.service";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const isAuthenticated = !!user;

  const loadUser = async () => {
    setInitializing(true);
    try {
      const result = await authService.getMe();
      setUser(result);
    } catch (error) {
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
      const result = await authService.login(loginData);
      setUser(result.user);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (registerData) => {
    setLoading(true);

    try {
      const result = await authService.register(registerData);
      if (result.user) {
        setUser(result.data.user);
      }
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        initializing,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
