import * as userApi from "./user.api";

// ============================== GET ME ==============================
export const getMe = async () => {
  const response = await userApi.getMe();

  return response.data;
};
