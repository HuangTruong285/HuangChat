import * as authApi from "./auth.api";
import { setAccessToken, removeAccessToken } from "../../utils/token";

// ============================== REGISTER ==============================
export const register = async (registerData) => {
  const response = await authApi.register(registerData);

  const { accessToken } = response.data;

  setAccessToken(accessToken);
};

// ============================== LOGIN ==============================
export const login = async (loginData) => {
  const response = await authApi.login(loginData);

  const { accessToken } = response.data;

  setAccessToken(accessToken);
};

// ============================== REFRESH ==============================
export const refresh = async () => {
  const response = await authApi.refresh();

  const { accessToken } = response.data;

  setAccessToken(accessToken);
};

// ============================== LOGOUT ==============================
export const logout = async () => {
  try {
    await authApi.logout();
  } finally {
    removeAccessToken();
  }
};
