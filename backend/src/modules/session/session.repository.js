import Session from "./session.model.js";

// ============================== CREATE ==============================

// Tạo session mới
export const create = (data) => {
  return Session.create(data);
};

// ============================== READ ==============================

// Tìm session theo token hash
export const findByTokenHash = (tokenHash) => {
  return Session.findOne({ tokenHash });
};

// Lấy tất cả session của user
export const findByUserId = (userId) => {
  return Session.find({ userId });
};

// ============================== UPDATE ==============================

// Thu hồi session theo token hash
export const revokeByTokenHash = (tokenHash) => {
  return Session.findOneAndUpdate(
    { tokenHash },
    { revoked: true },
    { new: true },
  );
};

// Thu hồi tất cả session của user
export const revokeAllByUserId = (userId) => {
  return Session.updateMany({ userId, revoked: false }, { revoked: true });
};

// ============================== DELETE ==============================

// Xóa session theo token hash
export const deleteByTokenHash = (tokenHash) => {
  return Session.deleteOne({ tokenHash });
};

// Xóa tất cả session của user
export const deleteAllByUserId = (userId) => {
  return Session.deleteMany({ userId });
};
