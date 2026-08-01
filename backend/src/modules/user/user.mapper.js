export const toUserResponse = (user) => {
  if (!user) return null;

  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    status: user.status,
    lastSeen: user.lastSeen,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export default {
  toUserResponse,
};
