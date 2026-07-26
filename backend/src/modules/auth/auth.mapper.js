import { userMapper } from "../user/index.js";

export const toLoginResponse = (user, accessToken) => ({
  accessToken,
  user: userMapper.toUserResponse(user),
});
