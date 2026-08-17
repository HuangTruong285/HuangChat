// Thông tin user của chính chủ tài khoản
// api/users/me
export const toCurrentUser = (user) => {
  if (!user) return null;

  return {
    id: user._id?.toString(),
    username: user.username,
    email: user.email,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    status: user.status,
    lastSeen: user.lastSeen,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

// Thông tin public của user
// api/users/:id
export const toPublicUser = (user) => {
  if (!user) return null;

  return {
    id: user._id?.toString(),
    username: user.username,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    status: user.status,
    lastSeen: user.lastSeen,
  };
};

// Mapping danh sách user public
export const toPublicUsers = (users = []) => {
  return users.map(toPublicUser);
};

// api/users/status/:id
export const toUserStatus = (user) => {
  if (!user) return null;

  return {
    id: user._id?.toString(),
    status: user.status,
    lastSeen: user.lastSeen,
  };
};
