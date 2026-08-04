import { userMapper } from "../user/index.js";

export const toAuthResponse = (user, accessToken) => {
  return {
    accessToken,
    user: userMapper.toUserResponse(user),
  };
};

export const toRefreshResponse = (accessToken) => {
  return {
    accessToken,
  };
};
