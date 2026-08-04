import Session from "./session.model.js";

/*
  create: Tạo refresh token mới
  findByToken: Tìm refresh token theo token
  findByUserId: Tìm tất cả refresh token của user
  revokeByToken: Thu hồi refresh token theo token
  revokeAllByUserId: Thu hồi tất cả refresh token của user
  deleteByToken: Xoá refresh token theo token
  deleteAllByUserId: Xoá tất cả refresh token của user
*/

// Tạo refresh token mới  (ĐÃ CHECK)
export const create = (data) => {
  return Session.create(data);
};

// Tìm refresh token theo token
export const findByToken = (token) => {
  return Session.findOne({ token });
};

// Lấy tất cả refresh token của user
export const findByUserId = (userId) => {
  return Session.find({ user: userId });
};

// Thu hồi refresh token
export const revokeByToken = (token) => {
  return Session.findOneAndUpdate({ token }, { revoked: true }, { new: true });
};

// Thu hồi tất cả refresh token của user
export const revokeAllByUserId = (userId) => {
  return Session.updateMany(
    { user: userId, revoked: false },
    { revoked: true },
  );
};
// ============================== DELETE ==============================
// Xoá refresh token theo token (ĐÃ CHECK)
export const deleteByToken = (token) => {
  return Session.deleteOne({ hashedRefreshToken: token });
};

// Xoá tất cả refresh token của user
export const deleteAllByUserId = (userId) => {
  return Session.deleteMany({ user: userId });
};
