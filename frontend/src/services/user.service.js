import * as userApi from "../api/user.api";

// ============================== GET ME ==============================
export const getMe = async () => {
  const response = await userApi.getMe();

  return response.data;
};
