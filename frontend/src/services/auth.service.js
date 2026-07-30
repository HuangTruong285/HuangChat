import * as authAPI from "../api/auth.api";

export const register = async (registerData) => {
  try {
    const response = await authAPI.register(registerData);
    const data = response.data;
    if (data?.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
    }
    return data;
  } catch (error) {}
};

export const login = async (loginData) => {
  const response = await authAPI.login(loginData);
  const data = response.data;
  localStorage.setItem("accessToken", data.accessToken);
  return data;
};

export const getMe = async () => {
  const response = await authAPI.getMe();
  return response.data;
};

export const logout = async () => {
  try {
    const response = await authAPI.logout();
    return response.data;
  } finally {
    localStorage.removeItem("accessToken");
  }
};
