// ==============================
// MAP USER BASE
// ==============================
export const toUser = (user) => {
  if (!user) return null;

  return {
    id: user._id?.toString(),
    username: user.username,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    status: user.status,
  };
};

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
  };
};

// Mapping danh sách user public
export const toPublicUsers = (users) => users.map(toPublicUser);

export const toUserSummary = (user) => {
  if (!user) return null;

  return {
    id: user._id?.toString(),
    username: user.username,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    status: user.status,
  };
};

// api/users/search
export const toUserSearchResult = (user) => {
  if (!user) return null;

  return {
    id: user._id?.toString(),
    username: user.username,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    status: user.status,
  };
};

// api/users/status/:id
export const toUserStatus = (user) => {
  if (!user) return null;

  return {
    id: user._id?.toString(),
    status: user.status,
  };
};
