// Thông tin trả về cho chính chủ tài khoản
export const toCurrentUser = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  displayName: user.displayName,
  avatar: user.avatar,
  status: user.status,
  createdAt: user.createdAt,
  updateAt: user.updateAt,
});

// Thông tin public của một user.
export const toPublicUser = (user) => ({
  id: user.id,
  username: user.username,
  displayName: user.displayName,
  avatar: user.avatar,
  status: user.status,
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
