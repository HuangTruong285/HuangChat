import { userMapper } from "../user/index.js";

export const toAuthResponse = (user, accessToken, refreshToken) => {
  return {
    accessToken,
    refreshToken,
    user: userMapper.toUserResponse(user),
  };
};

export const toRefreshResponse = (accessToken, refreshToken) => {
  return {
    accessToken,
    refreshToken,
  };
};

export default {
  toAuthResponse,
  toRefreshResponse,
};
