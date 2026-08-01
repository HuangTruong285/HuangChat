import * as authApi from "../api/auth.api";

// Đăng ký
export const register = async (registerData) => {
  const response = await authApi.register(registerData);

  const data = response.data.data;

  localStorage.setItem("accessToken", data.accessToken);

  return data.user;
};

// Đăng nhập
export const login = async (loginData) => {
  const response = await authApi.login(loginData);

  const data = response.data.data;

  localStorage.setItem("accessToken", data.accessToken);

  return data.user;
};

export const refresh = async () => {
  const response = await authApi.refresh();

  const data = response.data.data;

  localStorage.setItem("accessToken", data.accessToken);

  return data.accessToken;
};

export const logout = async () => {
  try {
    await authApi.logout();
  } finally {
    localStorage.removeItem("accessToken");
  }
};
