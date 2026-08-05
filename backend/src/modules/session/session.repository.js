import Session from "./session.model.js";

// ============================== CREATE ==============================

// Tạo refresh token mới
export const create = (data) => {
  return Session.create(data);
};

// ============================== READ/FIND ==============================

// Tìm refresh token theo token
export const findByToken = (token) => {
  return Session.findOne({ hashedRefreshToken: token });
};

// Lấy tất cả refresh token của user
export const findByUserId = (userId) => {
  return Session.find({ userId });
};

// ============================== UPDATE ==============================

// Thu hồi refresh token
export const revokeByToken = (token) => {
  return Session.findOneAndUpdate(
    { hashedRefreshToken: token },
    { revoked: true },
    { new: true },
  );
};

// Thu hồi tất cả refresh token của user
export const revokeAllByUserId = (userId) => {
  return Session.updateMany({ userId, revoked: false }, { revoked: true });
};

// ============================== DELETE ==============================
// Xoá refresh token theo token
export const deleteByToken = (token) => {
  return Session.deleteOne({ hashedRefreshToken: token });
};

// Xoá tất cả refresh token của user
export const deleteAllByUserId = (userId) => {
  return Session.deleteMany({ userId });
};
