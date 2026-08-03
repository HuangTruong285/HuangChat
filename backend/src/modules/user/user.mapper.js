// Dùng tạm
export const toUserResponse = (user) => {
  if (!user) return null;

  return {
    id: user._id.toString(),
    username: user.username,
    status: user.status,
    lastSeen: user.lastSeen,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

// Thông tin trả về cho chính chủ tài khoản
export const toCurrentUser = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  displayName: user.displayName,
  avatar: user.avatar,
  bio: user.bio,
  status: user.status,
  lastSeen: user.lastSeen,
  createdAt: user.createdAt,
  updateAt: user.updateAt,
});

// Thông tin public của một user.
export const toPublicUser = (user) => ({
  id: user.id,
  username: user.username,
  displayName: user.displayName,
  avatar: user.avatar,
  bio: user.bio,
  status: user.status,
  lastSeen: user.lastSeen,
});

// Thông tin dùng trong kết quả tìm kiếm
export const toSearchResult = (user) => ({
  id: user.id,
  username: user.username,
  displayName: user.displayName,
  avatar: user.avatar,
  status: user.status,
});

// Mapping danh sách user
export const toSearchResults = (users) => users.map(toSearchResult);

export default {
  toUserResponse,
  toCurrentUser,
  toPublicUser,
  toSearchResult,
  toSearchResults,
};
