import * as userApi from "./user.api";

// ============================== GET ME ==============================
export const getCurrentUser = async () => {
  const response = await userApi.getCurrentUser();

  return response.data;
};

export const updateMe = async (data) => {
  const response = await userApi.updateMe(data);

  return response.data;
};

export const updateAvatar = async (file) => {
  const response = await userApi.updateAvatar(file);

  return response.data;
};

export const updateStatus = async (status) => {
  const response = await userApi.updateStatus(status);

  return response.data;
};

export const searchUsers = async (params) => {
  const response = await userApi.searchUsers(params);

  return response.data;
};

export const deleteCurrentuser = async () => {
  const response = await userApi.deleteCurrentUser();

  return response.data;
};
