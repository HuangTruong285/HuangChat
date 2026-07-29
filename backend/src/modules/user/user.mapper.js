const toIsoString = (value) => {
  if (!value) return null;

  if (value instanceof Date) {
    return value.toISOString();
  }

  return new Date(value).toISOString();
};

export const toUserResponse = (user) => {
  if (!user) return null;

  return {
    id: user._id ? user._id.toString() : user.id,
    username: user.username,
    displayName: user.displayName || user.username,
    email: user.email,
    avatar: user.avatar || null,
    status: user.status ?? "offline",
    createdAt: toIsoString(user.createdAt),
    updatedAt: toIsoString(user.updatedAt),
  };
};

export const toUserPublicResponse = (user) => toUserResponse(user);
