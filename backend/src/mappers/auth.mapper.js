import { toUserResponse } from "./user.mapper.js";

export const toLoginResponse = (user, accessToken) => ({
  accessToken,
  user: toUserResponse(user),
});
