import RefreshToken from "./refreshToken.model.js";

/*
  create: Tạo refresh token mới
  findByToken: Tìm refresh token theo token
  findByUserId: Tìm tất cả refresh token của user
  revokeByToken: Thu hồi refresh token theo token
  revokeAllByUserId: Thu hồi tất cả refresh token của user
  deleteByToken: Xoá refresh token theo token
  deleteAllByUserId: Xoá tất cả refresh token của user
*/

// Tạo refresh token mới
export const create = (data) => {
  return RefreshToken.create(data);
};

// Tìm refresh token theo token
export const findByToken = (token) => {
  return RefreshToken.findOne({ token });
};

// Lấy tất cả refresh token của user
export const findByUserId = (userId) => {
  return RefreshToken.find({ user: userId });
};

// Thu hồi refresh token
export const revokeByToken = (token) => {
  return RefreshToken.findOneAndUpdate(
    { token },
    { revoked: true },
    { new: true },
  );
};

// Thu hồi tất cả refresh token của user
export const revokeAllByUserId = (userId) => {
  return RefreshToken.updateMany(
    { user: userId, revoked: false },
    { revoked: true },
  );
};

// Xoá refresh token theo token
export const deleteByToken = (token) => {
  return RefreshToken.findOneAndDelete({ token });
};

// Xoá tất cả refresh token của user
export const deleteAllByUserId = (userId) => {
  return RefreshToken.deleteMany({ user: userId });
};
