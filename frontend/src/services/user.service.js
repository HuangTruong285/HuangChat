import * as userApi from "../api/user.api";

export const getMe = async () => {
  const response = await userApi.getMe();

  return response.data.data;
};
