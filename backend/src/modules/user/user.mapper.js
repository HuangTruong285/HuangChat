// Thông tin user của chính chủ tài khoản
export const toCurrentUser = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email,
  displayName: user.displayName,
  avatar: user.avatar,
  status: user.status,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

// Thông tin public của user
export const toPublicUser = (user) => ({
  id: user._id,
  username: user.username,
  displayName: user.displayName,
  avatar: user.avatar,
  status: user.status,
});

// Mapping danh sách user public
export const toPublicUsers = (users) => users.map(toPublicUser);
