import Session from "./session.model.js";

// ============================== CREATE ==============================

// Tạo session mới
export const create = async (data) => {
  return Session.create(data);
};

// ============================== READ ==============================

// Tìm session theo token hash
export const findByTokenHash = async (tokenHash) => {
  return Session.findOne({ tokenHash });
};

// Lấy tất cả session của user
export const findByUserId = async (userId) => {
  return Session.find({ userId });
};

// ============================== UPDATE ==============================

// Thu hồi session theo token hash
export const revokeByTokenHash = async (tokenHash) => {
  return Session.findOneAndUpdate(
    { tokenHash, revoked: false },
    { revoked: true },
    { returnDocument: "after" },
  );
};

// Thu hồi tất cả session của user
export const revokeAllByUserId = async (userId) => {
  return Session.updateMany({ userId, revoked: false }, { revoked: true });
};

// ============================== DELETE ==============================

// Xóa session theo token hash
export const deleteByTokenHash = async (tokenHash) => {
  return Session.deleteOne({ tokenHash });
};

// Xóa tất cả session của user
export const deleteAllByUserId = async (userId) => {
  return Session.deleteMany({ userId });
};
