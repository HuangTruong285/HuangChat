export const toUserResponse = (user) => {
  if (!user) return null;

  return {
    id: user._id ? user._id.toString() : user.id,
    username: user.username,
    email: user.email,
    avatar: user.avatar || "",
    status: user.status || "online",
  };
};
